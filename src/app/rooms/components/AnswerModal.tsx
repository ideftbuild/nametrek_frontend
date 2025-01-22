import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';
import useGameStore from '@/store/gameStore';
import { Answer, Player } from '@/store/types';
import {X} from "lucide-react";

type AnswerModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  roomId: string;
  countdown: number | null;
  currentPlayer: Player | null;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ open, setOpen, roomId, countdown, currentPlayer }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const setIsPlayerTurn = useGameStore((state) => state.setIsPlayerTurn);
  const question = useGameStore((state) => state.question);
  const message = useGameStore((state) => state.message);
  const wsClient = useGameStore((state) => state.client);
  const setCountdown = useGameStore((state) => state.setCountdown);

  const handleSendAnswer = () => {
    const input = inputRef.current?.value;
    if (!input || input == '' || !question || !currentPlayer || !wsClient) return;

    const answer: Answer = {
      answer: input,
      category: question.category,
      playerId: currentPlayer.id,
    };

    const messageToSend = JSON.stringify(answer)
    wsClient.publish({
      destination: `/app/game/${roomId}/answer`,
      body: messageToSend,
    });
    setCountdown(null);
    setIsPlayerTurn(false);
  }

  return (
    <>
      {open && (
        <Dialog open={true} static onClose={() => {}} className="relative z-50">

          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"/>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform rounded-xl bg-gray-900/95 shadow-xl p-6 transition-all">
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Close rules"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-pink-400 mb-4">{question?.category && message}</h3>
                <button className="bg-greyCustom w-16 h-16 rounded-full flex items-center justify-center m-3">
                  <h3
                    className="text-xl font-bold bg-gradient-to-br from-purple-800 via-indigo-600 to-pink-600 backdrop-blur-md rounded-xl p-6 max-w-md mx-4 border border-pink-500 shadow-lg shadow-pink-700/50 animate-pulse bg-clip-text text-transparent">{countdown}</h3>
                </button>
              </div>
              <div className="flex flex-col gap-y-8">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Answer"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendAnswer();
                    }
                  }}
                  className="w-full rounded-lg p-3 transition-all duration-300 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
              <button onClick={handleSendAnswer}
                      className={"mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors"}>
                send
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
        )}
    </>
  );
}

export default AnswerModal;

