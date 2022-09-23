import React, { useEffect, useState } from 'react'
import { usePlayers } from 'src/connection/PeerProvider'
import './core/core.css'
import {Main} from './core/Main'


export const Playground = () => {
  useEffect(() => {
    const playersList = usePlayers()
    const newGame = new Main(document.querySelector('#playground'), playersList)
  }, [])
  
  return null
}
