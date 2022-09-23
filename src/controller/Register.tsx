import { useParams, useNavigate } from "react-router-dom";
import { PlayerLabel } from "../game/PlayerLabel";
import React, { useCallback } from "react";
import { useGame } from "src/connection/GameProvider";
import { Colors } from "../Colors";
import { useGameConnectionEvent } from "src/connection/PeerProvider";
import { Events } from "src/connection/events";

export const Register = () => {
  const { gameId, userId } = useParams();
  const navigate = useNavigate();

  const { player, updatePlayer, sendStart } = useGame();

  const handleChangeEvent = useCallback((event) => {
    event.preventDefault();
    updatePlayer((prevPlayer) => ({
      ...prevPlayer,
      name: event.target.value,
    }));
  }, []);

  const handleColorClick = useCallback((color) => {
    updatePlayer((prevPlayer) => ({
      ...prevPlayer,
      color,
    }));
  }, []);

  const handleStartClick = useCallback(sendStart, []);

  useGameConnectionEvent(gameId, Events.START, () => {
    navigate(`/controller/${gameId}/user/${userId}/play`);
  });

  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src="/public/beams.jpg"
          alt=""
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="absolute inset-0 bg-[url(/public/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <h1 className="text-3xl font-semibold leading-7 text-gray-900">
              Achtung ty kurvo!
            </h1>
            <div className="divide-y divide-gray-300/50">
              <div className="space-y-6 py-4"></div>

              <div className="divide-y divide-gray-300/50">
                <div className="py-8">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Player name
                  </label>
                  <input
                    onChange={handleChangeEvent}
                    name="name"
                    type={"text"}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <label className="pt-8 block text-sm font-medium text-gray-700">
                    Color (selected {player?.color})
                  </label>
                  <div className="p-4 grid grid-cols-4 gap-4 lg:gap-8 rounded-lg border border-gray-300 shadow-sm">
                    {Object.keys(Colors).map((color) => (
                      <div
                        key={color}
                        onClick={() => handleColorClick(color)}
                        style={{ backgroundColor: color }}
                        className={
                          "h-12 p-4 rounded-lg flex items-center justify-center hover:border-4 border-indigo-600 {color}} shadow-sm hover:cursor-pointer" +
                          (player?.color === color ? " border-4" : undefined)
                        }
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="py-8">
                  <button
                    onClick={handleStartClick}
                    className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
            <div className="text-xs leading-7 text-gray-400">
              GAME ID: {gameId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
