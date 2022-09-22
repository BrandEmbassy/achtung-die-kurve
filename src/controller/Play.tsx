import React from 'react'
import { useGame } from 'src/connection/GameProvider';
import { Player, PlayerLabel } from '../game/PlayerLabel';


export const Play = () => {
  const {player} = useGame()

  return <>
    <h1>
      Play
    </h1>
    <PlayerLabel key={player.playerId} {...player} />
  </>
}
