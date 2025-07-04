import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import useGameStore from '../../../store/gameStore';
import RoomService from '../../../services/RoomService';
import { WEBSOCKET_URL } from '../../../constants';

const roomService = new RoomService();

export const useGameClient = (roomId: string) => {
  const currentPlayer = useGameStore(state => state.currentPlayer);
  const getOwner = useGameStore(state => state.getOwner);
  const wsClientRef = useRef<Client | null>(null);
  const isConnecting = useRef(false);

  // First effect: Fetch player
  useEffect(() => {
    const fetchPlayer = async () => {
      if (!currentPlayer) {
        try {
          const player = await roomService.getPlayer(roomId);
          useGameStore.setState({ currentPlayer: player });
        } catch (err) {
          console.error("Error fetching player:", err);
          if (err instanceof Error) {
            useGameStore.setState({ error: err.message });
          }
        }
      }
    };
    fetchPlayer().then(r => console.log(r));
  }, [roomId, currentPlayer]);

  // Second effect: Setup WebSocket
  useEffect(() => {
    // If we're already connecting or have a client, don't proceed
    if (!currentPlayer || isConnecting.current || wsClientRef.current) {
      return;
    }

    isConnecting.current = true;

    const wsClient = new Client({
      brokerURL: WEBSOCKET_URL,
      connectHeaders: {
        playerId: currentPlayer.id.toString(),
        roomId,
      },
      debug: function (str) {
        console.log("WebSocket debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
    });

    wsClientRef.current = wsClient;

    wsClient.onWebSocketError = (error) => {
      console.error("WebSocket Error:", error);
      isConnecting.current = false;
    };

    wsClient.onStompError = (frame) => {
      console.error("STOMP Error:", frame);
      isConnecting.current = false;
    };

    wsClient.onConnect = async (frame) => {
      console.log("WebSocket connected:", frame);
      isConnecting.current = false;

      try {
        const roomPlayers = await roomService.fetchRoomUpdate(roomId);
        const roomCode = localStorage.getItem('roomCode');
        const roomLink = localStorage.getItem('roomLink');

        if (!roomCode && !roomLink && getOwner()?.id == currentPlayer?.id) {
          useGameStore.setState({ error: "Unable to connect. Please create a new room"})
          return;
        }

        useGameStore.setState({
          client: wsClient,  // Only set client after successful connection
          currentRoom: roomPlayers.room,
          allPlayers: roomPlayers.players,
          roomCode,
          roomLink,
          hasScores: false,
        });

        setupSubscriptions(wsClient, roomId);
      } catch (err) {
        console.error("Error in onConnect:", err);
        if (err instanceof Error) {
          useGameStore.setState({ error: err.message });
        }
      }
    };

    wsClient.onDisconnect = () => {
      console.log("WebSocket disconnected");
      isConnecting.current = false;
    };

    wsClient.activate();

    return () => {
      console.log("Cleaning up WebSocket...");
      isConnecting.current = false;
      if (wsClientRef.current) {
        wsClientRef.current.deactivate();
        wsClientRef.current = null;
        useGameStore.setState({ client: null });
      }
    };
  }, [currentPlayer, roomId, getOwner]);
};

// Separate function for subscriptions
const setupSubscriptions = (wsClient: Client, roomId: string) => {
  if (!wsClient) return;
  console.log("Successfully subscribed to channel");

  // subscribe for room updates
  wsClient?.subscribe(`/rooms/${roomId}`, (message) => {
    const roomPlayers = JSON.parse(message.body);
    useGameStore.setState({ allPlayers: roomPlayers.players });
  }, {
    'subscription-type': 'persistent',
    'durable-subscription-name': `/rooms/${roomId}`
  });

  // subscribe for game update
  wsClient?.subscribe(`/rooms/${roomId}/game`, (message) => {
    const gameEvent = JSON.parse(message.body);

    switch(gameEvent.type){
      case 'GAME_COUNTDOWN':
        useGameStore.getState().setCountdown(gameEvent.value);
        break;
      case 'ROUND_STARTED':
        useGameStore.getState().updateRound(gameEvent.value);
        break;
      case 'ROUND_ENDED':
        const message = `${gameEvent.value[0].name} wins!`;
        useGameStore.setState(
          { allPlayers: gameEvent.value,
            message,
            countdown: null,
            hasScores: true });
        break;
      case 'GAME_MESSAGE':
        displayMessageWithDelay(gameEvent.value, useGameStore.getState().setMessage);
        break;
      case 'GAME_STARTED':
        useGameStore.setState(
          { inProgress: true,
            allPlayers: gameEvent.value,
            message: "Name Trek begins!"});
        break;
      case 'GAME_ENDED':
        useGameStore.getState().reset(gameEvent.value);
        break;
      default:
        useGameStore.setState({ message: gameEvent.value });
        break;
    }
  });

  // subscribe to question
  wsClient?.subscribe(`/rooms/${roomId}/question`, (message) => {
    useGameStore.getState().setQuestion(JSON.parse(message.body));
  });

  // subscribe to answer
  wsClient?.subscribe(`/rooms/${roomId}/answer`, (message) => {
    const answerEvent = JSON.parse(message.body);
    switch(answerEvent.type){
      case 'WIN':
        useGameStore.setState({ message: "✔️", allPlayers: answerEvent.value });
        break;
      case 'LOSS':
        useGameStore.setState({ message: "❌", allPlayers: answerEvent.value });
        break;
      case 'ANSWER':
        useGameStore.setState({ message: answerEvent.value });
        break;
    }
    useGameStore.setState({ countdown: null });
  });
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
