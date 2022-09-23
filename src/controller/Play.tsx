import React from "react";
import { useGame } from "src/connection/GameProvider";
import { PlayerLabel } from "../game/PlayerLabel";

export const Play = () => {
  const { player, sendLeft, sendRight, sendStraight } = useGame();

  return (
    <>
      <div className="select-none">
        <PlayerLabel {...player} />
        <div className="flex h-screen items-center justify-center">
          <div className="block">
            <button
              onTouchStart={sendLeft}
              onTouchEnd={sendStraight}
              onMouseDown={sendLeft}
              onMouseUp={sendStraight}
              type="button"
              className="mr-2 sm:mr-8 md:mr-14 lg:mr-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
              </svg>
              <span className="sr-only"></span>
            </button>
            <button
              onTouchStart={sendRight}
              onTouchEnd={sendStraight}
              onMouseDown={sendRight}
              onMouseUp={sendStraight}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
              <span className="sr-only"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
