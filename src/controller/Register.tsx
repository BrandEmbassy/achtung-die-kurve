import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const Register: React.FC<{}> = () => {

  const {gameId, userId} = useParams()
  return (
    <div>
      <p>Register to game {gameId}</p>
      <p>I'm {userId}</p>
      <Link to={`/controller/${gameId}/play/${userId}`}>Start</Link>
    </div>
  )
}
