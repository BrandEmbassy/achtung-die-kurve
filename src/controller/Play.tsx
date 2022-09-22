import React from 'react'
import { Player, PlayerLabel } from '../game/PlayerLabel';

interface PlayProps {
  player: Player;
}

export const Play: React.FC<PlayProps> = (props) => {
  const {player} = props;

  return <>
    <h1>
      Play
    </h1>
    <PlayerLabel key={player.playerId} {...player} />
  </>
}
