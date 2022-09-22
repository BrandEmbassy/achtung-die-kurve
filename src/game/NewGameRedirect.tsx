import React from "react"
import { Navigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

const NewGameRedirect = (): JSX.Element => {
  const newGameId = uuidv4()
  
  return (
    <Navigate to={`/game/${newGameId}`} />
  )
}

export default NewGameRedirect