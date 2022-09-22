import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { PeerProvider } from "../connection/PeerProvider";
import Lobby from "./lobby";
import NewGameRedirect from "./NewGameRedirect";

import Play from "./play";

export const Game = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId/*" element={<GameWithPeerConnection />} />
      <Route path="/" element={<NewGameRedirect />} />
    </Routes>
  );
};

export const GameWithPeerConnection = () => {
  const { gameId } = useParams()
  return (
    <PeerProvider peerId={gameId}>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </PeerProvider>
  );
};
