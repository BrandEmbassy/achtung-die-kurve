import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewGameRedirect from './NewGameRedirect'
interface GameProps {
  
}

const X = () => (<div>game1</div>)

export const Game = (props: GameProps): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId" element={<X />} />
      <Route path='/' element={<NewGameRedirect />} />
    </Routes>
  )
}