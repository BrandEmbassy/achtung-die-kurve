import React, { useEffect, useState } from 'react'
import './core/core.css'
import {Main} from './core/Main'


const MAX_REFRESH_RATE = 1000/30 // 30fps
const GAME_SPEED = 2 // snake speed in game grid per second
new Main(document.querySelector('#playground'))

export const Playground = () => {
  // useState

  useEffect(() => {
    
  
  }, [])
  
  return null
}
