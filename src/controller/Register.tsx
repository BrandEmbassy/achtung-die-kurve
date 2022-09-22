import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const Register: React.FC<{}> = () => {

  const {gameId, userId} = useParams()
  return (
    <div>
      Register
      <Link to={`/controller/${gameId}/play/${userId}`}>Start</Link>
    </div>
  )
}
