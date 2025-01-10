import useGameStore from '../../../store/gameStore'
import Player from '../../../services/types'

const Player = ({ player: Player }) => {
  const { currentPlayer } = useGameStore();

  return (
    <div className="p-2 min-w-max rounded-full">
      <p>{player.name}</p>
      <p>{player.score}</p>
    </div>
  );
}

export default Player;
