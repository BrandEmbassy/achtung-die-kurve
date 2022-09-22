import React, { useEffect, useState } from 'react'
import './core/core.css'
import {Main} from './core/Main'


export const Playground = () => {
  useEffect(() => {
    const newGame = new Main(document.querySelector('#playground'))
  }, [])
  
  return null
}
