import useGameStore from '../store/gameStore';

const ToggleBtn = ({ toggler }: { toggler: () => void }) => {
  const isDynamicBackground = useGameStore((state) => state.isDynamicBackground);

  // console.log("toggled function: " + onClick);
  return (
    <div className={"relative"}>
      <button className={`${isDynamicBackground ? "bg-green-500" : "bg-[#b7b9ba]"} border border-[#aaa] rounded-lg 
        w-14 h-7 transition-colors duration-100 ease-in-out transition-border shadow-md relative 
        hover:border-gray-500`}
        onClick={() => {
          console.log("Onclick is triggered: " + toggler);
          if (toggler) toggler();
        }}
      >
        <div className={`${isDynamicBackground ? "left-[calc(3.5rem-1.8rem)]" : "" } w-6 h-6 bg-[#fff] rounded-full absolute translate-x-0 transition-[left] duration 150 ease-in-out
        left-[3px] top-1/2 -translate-y-1/2`}></div>
      </button>
    </div>
  )
}

export default ToggleBtn;
