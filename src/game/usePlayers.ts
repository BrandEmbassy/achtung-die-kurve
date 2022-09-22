import { Player } from './PlayerLabel'

export const usePlayers = ({}): Array<Player> => {
  const players: Array<Player> = [
    { playerId: '123A', name: 'Franta', color: '#ff0000' },
    { playerId: '321B', name: 'Pepa', color: '#00FF00' },
  ]
  return players
}
