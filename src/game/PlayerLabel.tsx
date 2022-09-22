import React from 'react'
export interface Player {
  playerId: string
  name: string
  color: string
}
export interface PlayerLabel extends Player {
  key: string
}
export const PlayerLabel = ({ playerId, name, color }: PlayerLabel) => {
  return <div style={{ color }}>❆ {name}</div>
}
