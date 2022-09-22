import React from 'react'
import { Player, PlayerLabel } from './PlayerLabel'

interface PlayersListProps {
  players: Array<Player>
}
export const PlayersList = ({ players }: PlayersListProps) => {
  return (
    <div>
      {players.map(player => (
        <PlayerLabel key={player.playerId} {...player} />
      ))}
    </div>
  )
}
