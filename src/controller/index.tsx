import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Register } from './Register'
import { Play } from './Play'
import { NewUserRedirect } from './NewUserRedirect';

interface ControllerProps {

}

export const Controller = (props: ControllerProps): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId" element={<NewUserRedirect />} />
      <Route path="/:gameId/register/:userId" element={<Register />} />
      <Route path='/:gameId/play/:userId' element={<Play />} />
    </Routes>
  )
}

