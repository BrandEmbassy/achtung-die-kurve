import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewGameRedirect from './NewGameRedirect'
import { Lobby } from './lobby'
import Play from './play'

export const Game = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId" element={<Lobby />} />
      <Route path="/:gameId/play" element={<Play />} />
      <Route path="/" element={<NewGameRedirect />} />
    </Routes>
  )
}
