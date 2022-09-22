import React from 'react'
import { Player } from './PlayerLabel'

interface PlayersListProps {
  players: Array<Player>
}
export const PlayersList = ({ players }: PlayersListProps) => {
  return (
    <ul>
      {players.map(player => (
        <li key={player.playerId}>{player.playerId}</li>
      ))}
    </ul>
  )
}
