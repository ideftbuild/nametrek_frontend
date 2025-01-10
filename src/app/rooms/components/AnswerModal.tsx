import { Dialog } from '@headlessui/react';
import { useState, useRef } from 'react';
import useGameStore from '../../../store/gameStore';
import { Answer } from '../../../store/types';

const AnswerModal = ({ isOpen, roomId, countdown, currentPlayer }) => {
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  const setIsPlayerTurn = useGameStore((state) => state.setIsPlayerTurn);
  const question = useGameStore((state) => state.question);
  const message = useGameStore((state) => state.message);
  const wsClient = useGameStore((state) => state.client);
  const setCountdown = useGameStore((state) => state.setCountdown);
  
  const handleSendAnswer = () => {
    const input = inputRef.current.value
    if (!input || input == '') return;

    const answer: Answer = {
      answer: input,
      category: question.category,
      playerId: currentPlayer.id,
      isCorrect: false,
    };

    const messageToSend = JSON.stringify(answer)
    console.log("sending answer: " + messageToSend + " client is: " + wsClient);

    wsClient.publish({
      destination: `/app/game/${roomId}/answer`,
      body: messageToSend,
    });
    setCountdown("");
    setIsPlayerTurn(false);
  }

  return (
    <>
      {isOpen && (
        <Dialog open={true} static onClose={() => {}} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <Dialog.Panel className="rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 bg-black bg-opacity-50">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-thin text-white mb-6">{question?.category && message}</h3>
              <div className="bg-greyCustom w-16 h-16 rounded-full flex items-center justify-center m-3">
                <h3 className="text-xl font-bold bg-gradient-to-br from-purple-800 via-indigo-600 to-pink-600 backdrop-blur-md rounded-xl p-6 max-w-md mx-4 border border-pink-500 shadow-lg shadow-pink-700/50 animate-pulse bg-clip-text text-transparent">{countdown}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              <input 
                ref={inputRef}
                type="text"
                className="bg-white text-black font-light px-2"
                placeholder="Answer"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendAnswer(e);
                  }
                }}
              />
            </div>
            <button onClick={handleSendAnswer} className="mt-6 px-6 py-2 bg-green-600 text-white w-full rounded-md hover:bg-green-700 transition-colors">
              send
            </button>
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
}

export default AnswerModal;

