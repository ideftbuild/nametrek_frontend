import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { Player, Room, Question, Answer } from './types';
import { useRef } from 'react';

/**
 * Represents the state of a game at a given time.
 */
interface GameState {
  // The current player using this client. If no player is logged in, this will be null.
  currentPlayer: Player | null;
  // The list of all players in the game. Can be null if the game state is not initialized.
  allPlayers: Player[] | null;
  // The room the game is taking place in. Null if the player is not in a room.
  currentRoom: Room | null;
  // Information about the client interacting with the game.
  client?: Client | null;

  error?: string | null;

  getOwner?: () => number | null;

  message: string | number | null;

  setMessage: (message: string) => null;

  question: Question | null;

  isPlayerTurn: true | false;

  setIsPlayerTurn: (flag: boolean) => null;

  countdown: string | null;

  setCountdown: (string) => null;

  setQuestion: (question: Question) =>  null;

  reset: () => null;

  answer: Answer | null;

  inProgress: boolean;

  updateRound: (round: number) => null;

  leaderboardRef;

  roomCode: string | null;

  roomLink: string | null;

  setRoomLink: (hostname: string, roomId: string) => null;
}

const useGameStore = create<GameState>((set, get) => ({
  currentPlayer: null,
  allPlayers: [],
  currentRoom: null,
  client: null,
  error: null,
  setError: (error) => set({ error }),
  message: null,
  question: null,
  isPlayerTurn: false,
  countdown: "",
  setCountdown: (value) => set({ countdown: value }),
  setMessage: (message) => set({ message }),
  inProgress: false,
  answer: null,
  leaderboardRef: null,
  setLeaderboardRef: (ref) => set({ leaderboardRef: ref }),

  setRoomLink: (hostname, roomId) => {
    const inviteLink = `${hostname}/invite/${roomId}`;
    set({ roomLink: inviteLink });
  },

  reset: (allPlayers) => {
    // navigate to the leaderboard page and render the data (gameEvent.value)
    const { currentRoom, leaderboardRef } = get();

    currentRoom.round = 0;
    set({ allPlayers, inProgress: false, message: "Game Over", countdown: null, question: null });

    if (leaderboardRef.current) {
      leaderboardRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  },

  updateRound: (round: number) => {
    const { currentRoom } = get();
    currentRoom.round = round;

    set({ message: `round ${number}` });
  },

  getOwner: ()  => {
    const { allPlayers, currentRoom } = get();
    if (allPlayers && currentRoom) {
      return allPlayers.find((player) => player.id === currentRoom.owner);
    }
    return null;
  },

  setCountdown: (value) => {
    const { question, currentPlayer } = get();

    // Update countdown and determine player turn
    if (value <= 0) {
      set({ isPlayerTurn: false, question: null, countdown: "" });
    } else {
      set({ countdown: value });
    }
  },

  setQuestion: (question) => {
    const { currentPlayer } = get();

    // Determine if it's the current player's turn
    const isPlayerTurn = currentPlayer?.id === question.playerId;

    // Update state with a delay for `isPlayerTurn` if needed
    setTimeout(() => {
      set({ isPlayerTurn });
    }, 2000);

    const message = `Name of ${question.category} that you know`;
    set({ question: question, message });
  },

  setIsPlayerTurn: (flag) => {
    set({ isPlayerTurn: flag });
  }
}));

export default useGameStore;
