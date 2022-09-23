import React, { useEffect, useState } from "react";
import { Events } from "src/connection/events";
import { useConnectionsEvent } from "src/connection/PeerProvider";
import { usePlayers } from "src/connection/PlayersProvider";
import "./core/core.css";
import { EventEmitter } from "./core/helpers/EventEmitter";
import { Main } from "./core/Main";

const controllEventEmitter = new EventEmitter();
const KEY_UP = "keyup";
const KEY_DOWN = "keydown";

export const Playground = () => {
  const playersList = usePlayers();
  console.log("PLAYER list z playgrounfdu", playersList);

  useConnectionsEvent(Events.LEFT, ({ playerId }) => {
    controllEventEmitter.emit(KEY_DOWN, `${playerId}.LEFT`);
  });
  useConnectionsEvent(Events.RIGHT, ({ playerId }) => {
    controllEventEmitter.emit(KEY_DOWN, `${playerId}.RIGHT`);
  });
  useConnectionsEvent(Events.STRAIGHT, ({ playerId }) => {
    controllEventEmitter.emit(KEY_UP, `${playerId}.LEFT`);
    controllEventEmitter.emit(KEY_UP, `${playerId}.RIGHT`);
  });

  useEffect(() => {
    const playgroundElement = document.querySelector("#playground");
    const newGame = new Main(
      playgroundElement,
      playersList,
      controllEventEmitter
    );
  }, []);

  return null;
};
