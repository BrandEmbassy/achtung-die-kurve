import { createContext, useContext, useState, useCallback } from "react";
import { useGameConnection } from "./PeerProvider";
import { Events } from "./events";

const GameContext = createContext();

export function GameProvider({ children, gameId }) {
  const [player, updatePlayerInternal] = useState();
  const connection = useGameConnection(gameId);

  const updatePlayer = useCallback((player) => {
    connection.send({ eventName: Events.PLAYER, payload: player });
    updatePlayerInternal(player);
  }, [connection]);

  return connection ? (
    <GameContext.Provider value={{ player, updatePlayer }}>
      {children}
    </GameContext.Provider>
  ) : (
    "Connecting..."
  );
}

export function useGame() {
  return useContext(GameContext);
}
