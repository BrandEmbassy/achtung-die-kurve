import React, {  } from 'react'
import {
  useParams,
} from 'react-router-dom'
import { usePlayers } from '../../connection/PeerProvider'
import { PlayerLabel } from '../PlayerLabel'
import { PlayersList } from '../PlayersList'
import { QrGenerator } from '../QrGenerator'

interface LobbyProps {}

export const Lobby = () => {
  const { gameId, ...rest } = useParams()
  const players = usePlayers()

  const gameUrl = `${window.location.protocol}//${window.location.host}/controller/${gameId}`
  const playUrl = `${window.location.protocol}//${window.location.host}/game/${gameId}/play`

  return (
    <>
      <h1>Achtung ty kurvo!</h1>
      <div>the game</div>
      Open game at this URL: <a href={gameUrl}>{gameUrl}</a>
      <QrGenerator url={gameUrl} />
      <PlayersList players={players} />
      <div>Waiting for other players</div>
      <div>when all players ready, pres Play on your controller</div>
      <div>
        or hit <a href={playUrl}>PLAY!</a>
      </div>
    </>
  )
}
