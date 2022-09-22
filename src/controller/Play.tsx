import React from "react";
import { useGame } from "src/connection/GameProvider";
import { Player, PlayerLabel } from "../game/PlayerLabel";

export const Play = () => {
  const { player, sendLeft, sendRight, sendStraight } = useGame();

  return (
    <>
      <h1>Play</h1>
      <PlayerLabel {...player} />
      <button
        onTouchStart={sendLeft}
        onTouchEnd={sendStraight}
        onMouseDown={sendLeft}
        onMouseUp={sendStraight}
      >
        Left
      </button>
      <button
        onTouchStart={sendRight}
        onTouchEnd={sendStraight}
        onMouseDown={sendRight}
        onMouseUp={sendStraight}
      >
        Right
      </button>
    </>
  );
};
