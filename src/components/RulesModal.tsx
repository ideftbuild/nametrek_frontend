import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

type RulesModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const RulesModal: React.FC<RulesModalProps> = ({ open, setOpen }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    className="relative z-50 bg-sky-300"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl transform rounded-xl bg-gray-900/95 shadow-xl transition-all">
          <div
            className="relative p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-pink-400 transition-colors"
              aria-label="Close rules"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gradient-to-r from-pink-400 to-yellow-300 p-1 rounded-xl mb-6">
                <h1 className="text-3xl font-bold bg-gray-900 px-6 py-2 rounded-lg text-white">
                  Rules
                </h1>
              </div>

              <h2 className="text-xl font-semibold text-pink-400 mb-2">
                How to Play NameTrek
              </h2>

              <p className="text-sm text-gray-400">
                Last updated: January 23, 2025
              </p>
            </div>

            {/* Rules Content */}
            <div className="space-y-4 text-gray-300 pr-2">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>You need at least 2 players to start a game</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Only the host can start a game and share the join code/link</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Once a game starts, new players must wait for the next round</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Categories are randomly selected for each round</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Name items that match the current category</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <div>
                    <p className="mb-2">Players are eliminated from the round if they:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex gap-3">
                        <span className="text-pink-400 shrink-0">-</span>
                        <span>Name something not in the category</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-pink-400 shrink-0">-</span>
                        <span>Don&#39;t answer within the time limit</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-pink-400 shrink-0">-</span>
                        <span>Give an answer already used in the round</span>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Win the game by being the last player standing</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-pink-400 shrink-0">•</span>
                  <span>Winners receive a bonus point</span>
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-pink-400">
                Ready to trek? Let&#39;s play! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RulesModal;
