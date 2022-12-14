import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Events } from "src/connection/events";
import { useBroadcast, usePlayers } from "../../connection/PlayersProvider";
import { PlayersList } from "../PlayersList";
import { QrGenerator } from "../QrGenerator";
import { useConnectionsEvent } from "../../connection/PeerProvider";

interface LobbyProps {}

export const Lobby = () => {
  const { gameId, ...rest } = useParams();
  const players = usePlayers();
  const broadcast = useBroadcast();
  const navigate = useNavigate();

  const playUrl = `/game/${gameId}/play`;

  useConnectionsEvent(Events.START, () => {
    broadcast({ eventName: Events.START });
    navigate(playUrl);
  });

  const gameUrl = `${window.location.protocol}//${window.location.host}/controller/${gameId}`;

  return (
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
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>
                You control your snake and it is your goal to cut off the other
                players with your snake, trying to stay alive as long as
                possible.
              </p>
              <QrGenerator url={gameUrl} />
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">Scan QR code on your mobile device</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">Complete registration</p>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <path
                      d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                      fill="none"
                    />
                  </svg>
                  <p className="ml-4">Wait for other players</p>
                </li>
              </ul>
            </div>
            <div className="py-8 leading-7">
              <p className="text-gray-900 text-base font-semibold">Players</p>
              {players.length > 0
                ? <PlayersList players={players} />
                : <span className="text-sm text-gray-400">Nobody is here</span>
              }
            </div>
            {players.length > 0 &&
                <div className="py-8 leading-7 text-center">
                    <Link to={playUrl}
                          className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-6 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        PLAY!
                    </Link>
                </div>
            }
            <div className="pt-8 text-xs leading-7">
              <p className="text-gray-400">DEBUG</p>
              <p>
                Open game at this URL: <br />
                <a href={gameUrl}>{gameUrl}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
