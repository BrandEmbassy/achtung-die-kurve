import React, { useEffect, useState } from 'react'
import { GamePlay } from './GamePlay'

const MAX_REFRESH_RATE = 1000/30 // 30fps
const GAME_SPEED = 2 // snake speed in game grid per second

export const Playground = () => {
  // useState

  useEffect(() => {
    const peerConnections = {} // TODO
    const game = new GamePlay(peerConnections)
    const interval = window.setInterval(async () => {
      const newGameState = await game.tick()
      
      if(newGameState !== null) {
        // canvas.render(newGameState)
      }
    }, MAX_REFRESH_RATE)
    
    return clearInterval(interval)
  }, [])

  return (
    <>
      Playground
    </>
  )
}
