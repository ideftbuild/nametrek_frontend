import { API_URL } from "@/config/constants";
class GameService {

  async startGame(roomId: string) {
    const response = await fetch(`${API_URL}/games/${roomId}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("Unable to start game");
    }
  }
}

export default GameService;
