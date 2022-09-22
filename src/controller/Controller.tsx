import React, { useState } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Register } from './Register'
import { Play } from './Play'
import { v4 as uuidv4 } from 'uuid'
import { Player } from '../game/PlayerLabel';

interface ControllerProps {

}

const Controller = (props: ControllerProps): JSX.Element => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const updatePlayer = (player: Player) => {
    setPlayer(player);
  };

  return (
        <Routes>
            <Route path="/:gameId" element={<NewUserRedirect />} />
            <Route path="/:gameId/register/:userId" element={<Register player={player} updatePlayer={updatePlayer} />} />
            <Route path='/:gameId/play/:userId' element={<Play player={player}/>} />
        </Routes>
    )
}

export const NewUserRedirect = (props) => {

    const newUserId = uuidv4()
    const {gameId} = useParams()

    return (
        <Navigate to={`/controller/${gameId}/register/${newUserId}`} />
    )
}

export default Controller
