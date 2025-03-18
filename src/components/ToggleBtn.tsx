import { useState } from 'react';
import useGameStore from '../store/gameStore';

const ToggleBtn = ({ onClick }) => {

  const isDynamicBackground = useGameStore((state) => state.isDynamicBackground);

  console.log("toggled function: " + onClick);
  return (
    <button className={`${isDynamicBackground ? "bg-green-500" : "bg-[#b7b9ba]"} border border-[#aaa] rounded-lg 
      w-14 h-7 transition-colors duration-100 ease-in-out transition-border duration-200 shadow-md relative 
      hover:border-gray-500`}
      onClick={() => {
        if (onClick) onClick();
      }} 
    >
      <div className={`${isDynamicBackground ? "left-[calc(3.5rem-1.8rem)]" : "" } w-6 h-6 bg-[#fff] rounded-full absolute translate-x-0 transition-[left] duration 150 ease-in-out
      left-[3px] top-1/2 -translate-y-1/2`}></div>
    </button>
  )
}

export default ToggleBtn;
