import RoomService from '../../../services/RoomService';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import useGameStore from '../../../store/gameStore';
import { useEffect } from 'react';

export const useGameClient = (roomId) => {
  const { currentPlayer, client, isPlayerTurn } = useGameStore();
  const roomService = new RoomService();

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!currentPlayer) {
        try {
          console.log("before all to player");
          const player = await roomService.getPlayer(roomId);
          useGameStore.setState({ currentPlayer: player });
        } catch (err) {
          console.log("error occurred when getting players")
          useGameStore.setState({ error: err.message })
        }
      }
    };

    fetchPlayer();
  }, [roomId, currentPlayer]);

  useEffect(() => {
    let wsClient = null;

    if (currentPlayer && !client) {
      const headers = { playerId: currentPlayer.id, roomId };
      
      wsClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: headers,
      });

      wsClient.onConnect = async (frame) => {
        console.log("Successfully connected");
        // initial load
        try {
          const roomPlayers = await roomService.fetchRoomUpdate(roomId);
          // Retrieve room code from localStorage
          const roomCode = localStorage.getItem('roomCode');
          const roomLink = localStorage.getItem('roomLink');
          useGameStore.setState({ currentRoom: roomPlayers.room, allPlayers: roomPlayers.players, roomCode, roomLink });
        } catch (err) {
          console.log("An error occurred: " + err);
          useGameStore.setState({ error: err.message })
        }
        // subscibe for room updates
        wsClient.subscribe(`/rooms/${roomId}`, (message) => {
          const roomPlayers = JSON.parse(message.body);
          console.log("setting all players");
          useGameStore.setState({ allPlayers: roomPlayers.players });
        }, {
          'subscription-type': 'persistent',
          'durable-subscription-name': `/rooms/${roomId}`
        });

        // subscribe for game update
        wsClient.subscribe(`/rooms/${roomId}/game`, (message) => {
          const gameEvent = JSON.parse(message.body);

          switch(gameEvent.type){
            case 'GAME_COUNTDOWN':
              useGameStore.getState().setCountdown(gameEvent.value);
              break;
            case 'GAME_STARTED':
              useGameStore.setState({ inProgress: true, allPlayers: gameEvent.value, message: "Name Trek begins!" });
              break;
            case 'GAME_ENDED':
              useGameStore.getState().reset(gameEvent.value);
              break;
            case 'ROUND_STARTED':
              useGameStore.getState().updateRound(gameEvent.value);
              break;
            case 'ROUND_ENDED':
              const message = `${gameEvent.value[0]} wins!`;
              useGameStore.setState({ allPlayers: gameEvent.value, message, countdown: null });
              break;
            case 'GAME_MESSAGE':
              displayMessageWithDelay(gameEvent.value, useGameStore.getState().setMessage);
              break;
            default:
              useGameStore.setState({ message: gameEvent.value });
              break;
          }
        });

        wsClient.subscribe(`/rooms/${roomId}/question`, (message) => {
          useGameStore.getState().setQuestion(JSON.parse(message.body));
        });

        wsClient.subscribe(`/rooms/${roomId}/answer`, (message) => {
          const answerEvent = JSON.parse(message.body);
          switch(answerEvent.type){
            case 'WIN': 
              useGameStore.setState({ message: "✔️" });
              break;
            case 'LOSS':
              useGameStore.setState({ message: "❌" });
            break;
          }
          useGameStore.setState({ allPlayers: answerEvent.value, countdown: null });
        });

      };

      useGameStore.setState({ client: wsClient });
      wsClient.activate();
    }

    const cleanup = () => {
      if (wsClient) {
        wsClient.deactivate();
        useGameStore.setState({ client: null });
      }
    };

    return () => {
      cleanup();  // Reset on page change/unmount
    };
  }, [currentPlayer, roomId]);
};

function displayMessageWithDelay(message: string, setMessage: (msg: string) => void, delay: number = 500) {
  const words = message.split(" "); // Split the message into words
  let currentMessage = "";

  words.forEach((word, index) => {
    setTimeout(() => {
      currentMessage += `${word} `;
      setMessage(currentMessage.trim()); // Update the message state word by word
    }, delay * index); // Increment delay for each word
  });
}
