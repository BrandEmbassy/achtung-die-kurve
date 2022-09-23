import React from "react";
export interface Player {
  playerId: string;
  name: string;
  color: string;
}

export const PlayerLabel = ({ playerId, name, color }) => {
  return <div style={{ color }}>❆ {name}</div>;
};
