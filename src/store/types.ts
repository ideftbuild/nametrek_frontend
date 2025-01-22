export type Player = {
  id: number;
  name: string;
  score: number;
  lost: boolean | null;
}

export type Room = {
  round: number;
  rounds: number;
  maxPlayers: number
  owner: number;
}

export type Question = {
  question: string;
  category: string;
  playerId: number;
}

export type Answer = {
  answer: string;
  category: string;
  playerId: number;
}
