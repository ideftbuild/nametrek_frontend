import type {
  RoomEventResponse,
  CreateRoomDto,
  JoinRoomDto,
  PlayerNameDto,
  Player,
  RoomPlayerInfo,
  Room
} from '../services/types';
  import { API_URL } from '@/config/constants';


export default class RoomService {
  private useFakeApi: boolean;

  constructor() {
    this.useFakeApi = process.env.NEXT_PUBLIC_USE_FAKE_API == 'true';
  }

  async fetchRoomUpdate(roomId: string): Promise<RoomEventResponse> {

    if (this.useFakeApi) {
        return new Promise((resolve) => {
        setTimeout(() => resolve({...roomEvent}), 1000);
      });
    } else {
      const response = await fetch(`${API_URL}/${roomId}/missed-update`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
      })

      if (!response.ok) {
        throw new Error("Failed to fetch room update");
      }
      return await response.json();
    }
  }

  async getPlayer(roomId: string): Promise<Player> {
    if (this.useFakeApi) {
        return new Promise((resolve) => {
        setTimeout(() => resolve({...player}), 1000);
      });
    } else {
      const response = await fetch(`${API_URL}/rooms/${roomId}/players/me`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to join room, please try again later");
      }
      return await response.json();
    }
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomPlayerInfo> {
    if (this.useFakeApi) {

      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(createRoomDto),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      return await response.json();
    }
  }

  async joinRoomById(roomId: string, playerNameDto: PlayerNameDto): Promise<RoomPlayerInfo> {
    if (this.useFakeApi) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch(`${API_URL}/rooms/${roomId}/join`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(playerNameDto),
      });
      if (!response.ok) {
        throw new Error('Failed to add player to room');
      }

      return await response.json();
    }
  }

  async joinRoomByCode(joinRoomDto: JoinRoomDto): Promise<RoomPlayerInfo> {
    if (this.useFakeApi) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch(`${API_URL}/rooms/join`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(joinRoomDto),
      });

      if (!response.ok) {
        throw new Error('Failed to add player to room');
      }

      return await response.json();
    }
  }
}

const player: Player = {
  id: 1,
  name: "Akan",
  score: 200,
  lost: false,
};

const room: Room = {
  round: 2,
  rounds: 4,
  maxPlayers: 4,
  owner: 1,
}
const roomEvent: RoomEventResponse = {
  playerId: 1,
  room: room,
  players: [player],
  eventType: "GET",
}

const roomPlayerInfo: RoomPlayerInfo = {
  roomId: "c85c2163-e11d-4890-b598-0039edf0e180",
  roomCode: '82REKI9K',
  player: player,
}
