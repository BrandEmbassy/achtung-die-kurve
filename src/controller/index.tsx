import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Register } from "./Register";
import { Play } from "./Play";
import { NewUserRedirect } from "./NewUserRedirect";
import { PeerProvider } from "../connection/PeerProvider";


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

  return (
    <PeerProvider peerId={userId}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </PeerProvider>
  );
};
