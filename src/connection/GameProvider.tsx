import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useGameConnection } from "./PeerProvider";
import { Events } from "./events";
import { Player } from "src/game/PlayerLabel";

const GameContext = createContext();

export function GameProvider({ children, gameId, userId }) {
  const connection = useGameConnection(gameId);
  const [player, updatePlayerInternal] = useState<Player>({
    playerId: userId,
    color: "gray",
    name: "",
  });

  useEffect(() => {
    if (!connection) {
      return;
    }
    const player = JSON.parse(sessionStorage.getItem("player"));
    if (player?.playerId === userId) {
      connection.send({ eventName: Events.PLAYER, payload: player });
      updatePlayerInternal(player);
    }
  }, [connection, userId]);

  const updatePlayer = useCallback(
    (player) => {
      if (typeof player === "function") {
        updatePlayerInternal((prevPlayer) => {
          const newPlayer = player(prevPlayer);
          connection.send({ eventName: Events.PLAYER, payload: newPlayer });
          sessionStorage.setItem("player", JSON.stringify(newPlayer));
          return newPlayer;
        });
      } else {
        updatePlayerInternal(player);
        connection.send({ eventName: Events.PLAYER, payload: player });
        sessionStorage.setItem("player", JSON.stringify(player));
      }
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

  const contextValue = useMemo(
    () => ({
      player,
      updatePlayer,
      sendLeft,
      sendRight,
      sendStraight,
      sendStart,
    }),
    [player, updatePlayer, sendLeft, sendRight, sendStraight, sendStart]
  );

  return connection ? (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  ) : (
    "Connecting to game..."
  );
}

export function useGame() {
  return useContext(GameContext);
}
