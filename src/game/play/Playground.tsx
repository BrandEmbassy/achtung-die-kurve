import React, { useEffect, useState } from 'react'
import { Events } from 'src/connection/events'
import { useConnectionsEvent, usePlayers } from 'src/connection/PeerProvider'
import './core/core.css'
import {Main} from './core/Main'


export const Playground = () => {
  const playersList = usePlayers()
  
  useEffect(() => {
    const playgroundElement = document.querySelector('#playground')
    const newGame = new Main(playgroundElement, playersList)
  }, [])
  
  return null
}
