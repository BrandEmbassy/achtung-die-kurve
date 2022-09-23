import React from "react";
import { Player, PlayerLabel } from "./PlayerLabel";

interface PlayersListProps {
  players: Array<Player>;
}
export const PlayersList = ({ players }: PlayersListProps) => {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.playerId}>
          <PlayerLabel {...player} />
        </li>
      ))}
    </ul>
  );
};
