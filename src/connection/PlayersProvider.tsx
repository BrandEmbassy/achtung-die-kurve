import { createContext, useState, useContext } from "react";
import { Player } from "src/game/PlayerLabel";
import { Events } from "./events";
import { useConnectionsEvent } from "./PeerProvider";

const PlayersContext = createContext();

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);

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

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers(): Array<Player> {
  return useContext(PlayersContext);
}
