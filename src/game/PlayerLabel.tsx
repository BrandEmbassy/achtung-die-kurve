import React from 'react'
export interface Player {
  id: string
  name: string
  color: string
}
export interface PlayerLabel extends Player {
  key: string
}
export const PlayerLabel = ({ id, name, color }: PlayerLabel) => {
  return <div style={{ color }}>❆ {name}</div>
}
