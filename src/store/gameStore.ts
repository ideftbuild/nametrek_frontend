import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { Player, Room, Question, Answer } from './types';
import React from "react";
import GameService from "@/services/GameService";

/**
 * Represents the state of a game at a given time.
 */
interface GameState {
  // The current player using this client. If no player is logged in, this will be null.
  currentPlayer: Player | null;
  // The list of all players in the game. Can be null if the game state is not initialized.
  allPlayers: Player[];
  // The room the game is taking place in. Null if the player is not in a room.
  currentRoom: Room | null;
  // Information about the client interacting with the game.
  client?: Client | null;

  error?: string | null;

  setError: (error: string | null) => void;

  getOwner: () => Player | null | undefined;

  message: string | number | null;

  setMessage: (message: string) => void;

  question: Question | null;

  isPlayerTurn: true | false;

  setIsPlayerTurn: (flag: boolean) => void;

  countdown: number | null;

  setCountdown: (value: number | null) => void;

  setQuestion: (question: Question) =>  void;

  reset: (allPlayers: Player[]) => void;

  answer: Answer | null;

  inProgress: boolean;

  updateRound: (round: number) => void;

  leaderboardRef: React.RefObject<HTMLElement> | React.RefObject<null> | null;

  setLeaderboardRef: (ref: React.RefObject<HTMLElement> | React.RefObject<null>) => void;

  hasScores: boolean;

  roomLink: string | null;

  roomCode: string | null;

  isDynamicBackground: boolean | null;

  gameService: GameService;

  setIsDynamicBackground: (value: boolean) => void;

  bgError: string | null;

  setBgError: (value: string | null) => void;
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
  countdown: null,
  setMessage: (message) => set({ message }),
  inProgress: false,
  answer: null,
  leaderboardRef: null,
  setLeaderboardRef: (ref) => set({ leaderboardRef: ref }),
  hasScores: false,
  roomCode: null,
  roomLink: null,
  gameService: new GameService(),
  bgError: null,
  setBgError: (value ) => set({ bgError: value }),
  isDynamicBackground: localStorage?.getItem('dynamicBgEnabled') === 'true',
  setIsDynamicBackground: (value) => {
    console.log("Inside store setting up dynamic value to : " + value);
    set({ isDynamicBackground: value })
  },

  reset: (allPlayers) => {
    // navigate to the leaderboard page and render the data (gameEvent.value)
    const { currentRoom, leaderboardRef } = get();

    if (currentRoom) {
      currentRoom.round = 0;
      set({ allPlayers, inProgress: false, message: "Game Over", countdown: null, question: null });

      if (leaderboardRef?.current) {
        leaderboardRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },

  updateRound: (round: number) => {
    const { currentRoom } = get();
    if (currentRoom) {
      currentRoom.round = round;

      set({ message: `round ${round}`});
    }
  },

  getOwner: ()  => {
    const { allPlayers, currentRoom } = get();
    if (allPlayers && currentRoom) {
      return allPlayers.find((player) => player.id === currentRoom.owner);
    }
    return null;
  },

  setCountdown: (value) => {
    // Update countdown and determine player turn
    if (value === null) {
      set({countdown: null});
    } else if (value <= 0) {
      set({ isPlayerTurn: false, question: null, countdown: null });
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
