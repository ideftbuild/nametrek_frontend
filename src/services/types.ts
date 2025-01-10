export type RoomEventResponse = {
  room: Room
  players: <PlayerScore>[];
  eventType: string;
}

export type CreateRoomDto = {
  playerName: string;
  maxRounds: number;
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
}

export type RoomPlayerInfo = {
  roomId: string;
  roomCode: string | null;
  player: Player;
}
