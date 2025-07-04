export type RoomModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export type CreateRoomResponse = {
  room: {
    id: string;
    status: string;
    activePlayerCount: number;
    maxPlayers: number;
    currentRound: number;
    maxRounds: number;
    owner: string;
  };
  player: {
    id: string;
    username: string;
    score: number;
    roomId: string;
  };
  eventType: string;
  timestamp: string;
}

