import React, { useEffect, useState } from 'react'
import { Events } from 'src/connection/events'
import { useConnectionsEvent } from 'src/connection/PeerProvider'
import { usePlayers } from 'src/connection/PlayersProvider'
import './core/core.css'
import { EventEmitter } from './core/helpers/EventEmitter'
import { InputController } from './core/helpers/inputController'
import { Main } from './core/Main'

const KEY_UP = 'keyup'
const KEY_DOWN = 'keydown'

let controllEventEmitter = undefined
let theGame = null
export const Playground = () => {
  const playersList = usePlayers()
  useEffect(() => {
    const playgroundElement = document.querySelector('#playground')
    controllEventEmitter = new InputController(playgroundElement)
  })

  useConnectionsEvent(Events.LEFT, ({ playerId }) => {
    controllEventEmitter.emit(KEY_DOWN, `${playerId}.LEFT`)
  })
  useConnectionsEvent(Events.RIGHT, event => {
    const { playerId } = event

    controllEventEmitter.emit(KEY_DOWN, `${playerId}.RIGHT`)
  })
  useConnectionsEvent(Events.STRAIGHT, event => {
    const { playerId } = event
    controllEventEmitter.emit(KEY_UP, `${playerId}.LEFT`)
    controllEventEmitter.emit(KEY_UP, `${playerId}.RIGHT`)
  })

  useEffect(() => {
    const playgroundElement = document.querySelector('#playground')
    theGame = new Main(playgroundElement, playersList, controllEventEmitter)
    return () => {
      theGame = null
    }
  }, [])

  return null
}
