import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Register } from "./Register";
import { Play } from "./Play";
import { Player } from "../game/PlayerLabel";
import { PeerProvider } from "../connection/PeerProvider";
import { GameProvider } from "../connection/GameProvider";
import { NewUserRedirect } from "./NewUserRedirect";

export const Controller = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/:gameId" element={<NewUserRedirect />} />
      <Route
        path="/:gameId/user/:userId/*"
        element={<ControllerWithPeerConnection />}
      />
    </Routes>
  );
};

export const ControllerWithPeerConnection = (): JSX.Element => {
  const { userId, gameId } = useParams();

  return (
    <PeerProvider peerId={userId}>
      <GameProvider gameId={gameId}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </GameProvider>
    </PeerProvider>
  );
};
