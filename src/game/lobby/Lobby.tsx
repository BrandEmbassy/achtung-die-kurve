import React, { useState } from 'react'
import {
  useParams,
} from 'react-router-dom'
import { Events } from 'src/connection/events'
import { usePlayers } from '../../connection/PeerProvider'
import { PlayerLabel } from '../PlayerLabel'
import { PlayersList } from '../PlayersList'
import { QrGenerator } from '../QrGenerator'
import { useConnectionsEvent } from '../../connection/PeerProvider'

interface LobbyProps {}

export const Lobby = () => {
  const { gameId, ...rest } = useParams()
  const players = usePlayers()

  const [action, setAction] = useState(null)

  useConnectionsEvent(Events.LEFT, (player) => {
    setAction({player, event: Events.LEFT})
  })
  useConnectionsEvent(Events.RIGHT, (player) => {
    setAction({player, event: Events.RIGHT})
  })
  useConnectionsEvent(Events.STRAIGHT, (player) => {
    setAction(null)
  })

  const gameUrl = `${window.location.protocol}//${window.location.host}/controller/${gameId}`
  const playUrl = `${window.location.protocol}//${window.location.host}/game/${gameId}/play`

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <img src="/public/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="absolute inset-0 bg-[url(/public/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div
        className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold leading-7 text-gray-900">Achtung ty kurvo!</h1>
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>You control your snake and it is your goal to cut off the other players with your snake, trying to stay alive as long as possible.</p>
              <QrGenerator url={gameUrl}/>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round"
                       strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Scan QR code on your mobile device
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round"
                       strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Complete registration
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" strokeLinecap="round"
                       strokeLinejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">Wait for other players</p>
                </li>
              </ul>
            </div>
            <div className="py-8  leading-7">
              <p className="text-gray-900 text-base font-semibold">Players</p>
              {action ? JSON.stringify(action) : null}
              <PlayersList players={players} />
            </div>
            <div className="pt-8 text-xs leading-7">
              <p className="text-gray-400">DEBUG</p>
              <p>Open game at this URL: <br /><a href={gameUrl}>{gameUrl}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
