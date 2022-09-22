import { createContext, useContext, useState } from 'react';
import { useGameConnection } from './PeerProvider';

const GameContext = createContext()

export function GameProvider({children, gameId}) {
  const [player, updatePlayer] = useState();
  const connection = useGameConnection(gameId);

  return <GameContext.Provider value={{player, updatePlayer}}>{children}</GameContext.Provider>
}

export function useGame() {
  return useContext(GameContext);
}
