import React from 'react'
import { PlayerLabel } from './PlayerLabel'
import { PlayersList } from './PlayersList'
import { QrGenerator } from './QrGenerator'
import { usePlayers } from './usePlayers'

interface GameProps {}

export const Lobby = () => {
  const gameId = 'id123'
  const gameUrl = `/game/${gameId}`

  const players = usePlayers(gameId)
  return (
    <>
      <h1>Achtung ty kurvo!</h1>
      <div>the game</div>
      Open game at this URL: {`/game/${gameId}`}
      <QrGenerator url={gameUrl} />
      <PlayersList players={players} />
      <div>Waiting for other players</div>
      <div>when all players ready, pres Play on your controller</div>
    </>
  )
}
