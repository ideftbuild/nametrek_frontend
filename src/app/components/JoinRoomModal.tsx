import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { RoomModalProps } from "./types";
import RoomService from "../../services/RoomService";
import useGameStore from "../../store/gameStore";
import { audiowide } from "../fonts";
import { X } from "lucide-react";

const roomService = new RoomService();

const JoinRoomModal = ({ open, setOpen }: RoomModalProps) => {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joining, setJoining] = useState(false);
  const setError = useGameStore((state) => state.setError);
  const router = useRouter();

  const setClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   console.log('open has changed join room modal:', open);
  // }, [setOpen]);

  async function handleJoin() {
    try {
      console.log("Handle join called");
      setJoining(true);

      if (playerName === "" || roomCode == "") {
        setError("Please provide a player name and room code " + Math.random());
        return;
      }

      const roomPlayer = await roomService.joinRoomByCode({
        playerName,
        roomCode,
      });
      useGameStore.setState({ currentPlayer: roomPlayer.player });

      router.push(`/rooms/${roomPlayer.roomId}`);
    } catch (err) {
      console.log("An error occurred:", err);
      setError("Failed to join. Please ensure it an active room and try again");
    } finally {
      setJoining(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/*<div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"/>*/}

      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 background-blur-sm">
        <div className="w-full max-w-2xl transform rounded-xl bg-gray-900/95 shadow-xl p-6 transition-all">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-pink-400 transition-colors"
            aria-label="Close rules"
          >
            <X size={20} />
          </button>
          <h3
            className={`text-xl font-semibold text-green-300 mb-4 ${audiowide.className}`}
          >
            Join a new room to start playing
          </h3>
          <div className="flex flex-col gap-y-8">
            <input
              type="text"
              value={playerName}
              placeholder="Player Name"
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input
              type="text"
              value={roomCode}
              placeholder="Room Code"
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          {joining ? (
            <button
              onClick={handleJoin}
              className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors"
            >
              Joining
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default JoinRoomModal;
