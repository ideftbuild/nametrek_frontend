'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import useGameStore from '../store/gameStore'

const Notification = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const bgError = useGameStore(state => state.bgError);
  const error = useGameStore(state => state.error);
  const setError = useGameStore(state => state.setError);
  const setBgError = useGameStore(state => state.setBgError);

  const removeError = (error: string) => {
    setErrors(prev => (
      prev.filter(err => err !== error)
    ));
  }

  // Background errors
  useEffect(() => {
    if (bgError) {
      setErrors(prev => ([
        bgError,
        ...prev
      ]));

      setTimeout(() => {
        removeError(bgError);
        setBgError(null);
      }, 5000);
    }
  }, [bgError, setBgError]);

  // Game Errors
  useEffect(() => {
    if (error) {
      setErrors(prev => ([
        error,
        ...prev
      ]));

      setTimeout(() => {
        removeError(error);
        setError(null);
      }, 5000);
    }
  }, [error, setError]);

  return (
    <div className="absolute flex flex-col gap-2 absolute w-[70%] md:w-[30%] left-1/2 top-0 -translate-x-1/2 text-white cursor-pointer z-[100]">
      {
        errors.map((error, index) => (
        <div key={index} className='w-full flex justify-between bg-gray-900/95 rounded-md shadow-lg p-4'>
          <p className="flex flex-wrap">{error}</p> 
          <button className='cursor-pointer text-gray-400 hover:text-pink-400 transition-colors'
            onClick={() => removeError(error)}
            aria-label="Close rules"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notification;
