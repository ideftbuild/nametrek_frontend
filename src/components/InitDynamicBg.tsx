'use client';
import { useEffect } from 'react';
import useGameStore from '@/store/gameStore';


const InitDynamicBg = () => {
  const setIsDynamicBackground = useGameStore(state => state.setIsDynamicBackground);


  useEffect(() => {
    setIsDynamicBackground(localStorage?.getItem('dynamicBgEnabled') === 'true')
  }, [setIsDynamicBackground])

  return null;
}

export default InitDynamicBg;
