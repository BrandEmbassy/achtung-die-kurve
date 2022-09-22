import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Register } from './Register'
import { Play } from './Play'
import { v4 as uuidv4 } from 'uuid';

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


export const NewUserRedirect = (props) => {

  const newUserId = uuidv4()
  const {gameId} = useParams()

  return (
    <Navigate to={`/controller/${gameId}/register/${newUserId}`} />
  )
}
