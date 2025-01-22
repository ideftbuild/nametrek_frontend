export type RoomEventResponse = {
  playerId: number | undefined;
  room: Room | undefined;
  players: Player[];
  eventType: string;
}

export type CreateRoomDto = {
  playerName: string;
  rounds: number;
}

export type JoinRoomDto = {
  playerName: string;
  roomCode: string;
}

export type PlayerNameDto = {
  playerName: string;
}

export type Player = {
  id: number;
  name: string;
  score: number;
  lost: boolean | null;
}

export type Room = {
  round: number;
  rounds: number;
  maxPlayers: number;
  owner: number;
}

export type RoomPlayerInfo = {
  roomId: string;
  roomCode: string | null;
  player: Player;
}

export type Contact = {
  to: string | undefined;
  email: string;
  subject: string;
  text: string;
}

