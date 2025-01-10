import type { RoomEventResponse, CreateRoomDto, oinRoomDto, PlayerNameDto, Player, RoomPlayerInfo } from '../services/types';

export default class RoomService {
  private useFakeApi: boolean;

  constructor() {
    this.useFakeApi = process.env.NEXT_PUBLIC_USE_FAKE_API == 'true';
  }

  async fetchRoomUpdate(roomId: string): Promise<RoomEventResponse> {

    console.log("function is called");
    const response = await fetch(`http://localhost:8080/rooms/${roomId}/missed-update`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    if (!response.ok) {
      console.log("throwing erorr");
      throw new Error("Failed to fetch room update");
    }
    return await response.json();
  }

  async getPlayer(roomId: string): Promise<Player> {
    if (this.useFakeApi) {
        return new Promise((resolve) => {
        setTimeout(() => resolve({...player}), 1000);
      });
    } else {
      console.log('before making request');
      const response = await fetch(`http://localhost:8080/rooms/${roomId}/players/me`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      console.log('after making request');
      if (!response.ok) {
        console.log('throwing the error');
        throw new Error("Failed to join room, please try again later");
      }
      console.log('returning player');
      return await response.json();
    }
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomPlayerInfo> {
    if (this.useFakeApi) {

      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch('http://localhost:8080/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(createRoomDto),
      });

      if (!response.ok) {
        console.log("error occurred here");
        throw new Error('Failed to create room');
      }

      console.log("returning response: " + await response);
      return await response.json();
    }
  }

  async joinRoomById(roomId: string, playerNameDto: PlayerNameDto): Promise<RoomPlayerInfo> {
    if (this.useFakeApi) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch(`http://localhost:8080/rooms/${roomId}/join`, {
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
    console.log("dto is: " + joinRoomDto);
    if (this.useFakeApi) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({...roomPlayerInfo}), 1000);
      });
    } else {
      const response = await fetch(`http://localhost:8080/rooms/join`, {
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
  id: '12345',
  name: "Akan",
  score: 200,
};

const roomEvent: RoomEventResponse = {
  round: 2,
  rounds: 4,
  players: [player],
  eventType: "GET",
}

const roomPlayerInfo: RoomPlayerInfo = {
  roomId: "c85c2163-e11d-4890-b598-0039edf0e180",
  player: player,
}
