import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { Player } from "src/game/PlayerLabel";
import { Events } from "./events";
import { useConnections, useConnectionsEvent } from "./PeerProvider";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const connections = useConnections();

  useConnectionsEvent(Events.PLAYER, (player) => {
    setPlayers((prev) => {
      const players = prev.filter(
        (prevPlayer) => prevPlayer.playerId !== player.playerId
      );

      return [...players, player];
    });

    return () => {
      setPlayers((prev) => prev.filter((p) => p.playerId !== player.playerId));
    };
  });

  const broadcast = useCallback(
    (event) => {
      connections.forEach((conn) => {
        conn.send(event);
      });
    },
    [connections]
  );

  const contextValue = useMemo(
    () => ({
      players,
      broadcast,
    }),
    [players, broadcast]
  );

  return (
    <PlayersContext.Provider value={contextValue}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers(): Array<Player> {
  const { players } = useContext(PlayersContext);
  return players;
}

export function useBroadcast() {
  const { broadcast } = useContext(PlayersContext);
  return broadcast;
}
