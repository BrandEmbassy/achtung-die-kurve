import { createContext, useContext, useState, useCallback } from "react";
import { useGameConnection } from "./PeerProvider";
import { Events } from "./events";

const GameContext = createContext();

export function GameProvider({ children, gameId }) {
  const [player, updatePlayerInternal] = useState();
  const connection = useGameConnection(gameId);

  const updatePlayer = useCallback(
    (player) => {
      connection.send({ eventName: Events.PLAYER, payload: player });
      updatePlayerInternal(player);
    },
    [connection]
  );

  const sendRight = useCallback(() => {
    connection.send({ eventName: Events.RIGHT, payload: player });
  }, [connection, player]);

  const sendLeft = useCallback(() => {
    connection.send({ eventName: Events.LEFT, payload: player });
  }, [connection, player]);

  const sendStraight = useCallback(() => {
    connection.send({ eventName: Events.STRAIGHT, payload: player });
  }, [connection, player]);

  const sendStart = useCallback(() => {
    connection.send({ eventName: Events.START, payload: player });
  }, [connection, player]);

  return connection ? (
    <GameContext.Provider
      value={{
        player,
        updatePlayer,
        sendLeft,
        sendRight,
        sendStraight,
        sendStart,
      }}
    >
      {children}
    </GameContext.Provider>
  ) : (
    "Connecting..."
  );
}

export function useGame() {
  return useContext(GameContext);
}
