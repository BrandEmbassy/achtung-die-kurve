import { Link, useParams } from 'react-router-dom'
import { Player } from '../game/PlayerLabel';
import React  from 'react';
import { useGameConnection } from 'src/connection/PeerProvider';
import { useGame } from 'src/connection/GameProvider';



export const Register = () => {
  const {gameId, userId} = useParams()

  const { player, updatePlayer} = useGame();

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    updatePlayer({
      playerId: userId,
      name: event.currentTarget.name.value,
      color: '#0492C2',
    });
  }

  return (
    <div>
      <p>Register to game {gameId}</p>
      {player
        ? <>
            <p>Welcome {player?.name}</p>
            <Link to={`/controller/${gameId}/user/${userId}/play`}>Start</Link>
        </>
        : <form onSubmit={handleRegisterPlayer}>
            <input name="name" type={'text'} />
            <button>Register</button>
          </form>
      }
    </div>
  )
}
