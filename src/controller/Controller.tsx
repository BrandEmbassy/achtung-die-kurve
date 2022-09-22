import React, { useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { Register } from './Register'
import { Play } from './Play'
import { Player } from '../game/PlayerLabel';
import { PeerProvider } from 'src/connection/PeerProvider';
import { NewUserRedirect } from './NewUserRedirect';

export const Controller = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId" element={<NewUserRedirect />} />
      <Route path="/:gameId/user/:userId/*" element={<ControllerWithPeerConnection />} />
    </Routes>
  );
};

export const ControllerWithPeerConnection = (): JSX.Element => {
  const { userId } = useParams();

    const [player, setPlayer] = useState<Player | undefined>(undefined);
  const updatePlayer = (player: Player) => {
    setPlayer(player);
  };


  return (
    <PeerProvider peerId={userId}>
      <Routes>
        <Route path="/register" element={<Register player={player} updatePlayer={updatePlayer} />} />
        <Route path="/play" element={<Play player={player}/>} />
      </Routes>
    </PeerProvider>
  );
};
