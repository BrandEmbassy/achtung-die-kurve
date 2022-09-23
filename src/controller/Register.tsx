import { Link, useParams, useNavigate } from 'react-router-dom'
import { Player } from '../game/PlayerLabel';
import React, { useCallback }  from 'react';
import { useGame } from 'src/connection/GameProvider';



export const Register = () => {
  const {gameId, userId} = useParams()
  const navigate = useNavigate()

  const { player, updatePlayer, sendStart} = useGame();

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    updatePlayer({
      playerId: userId,
      name: event.currentTarget.name.value,
      color: '#0492C2',
    });
  }

  const handleStartClick = useCallback(() => {
    sendStart();
    navigate(`/controller/${gameId}/user/${userId}/play`)
  }, []);

  return (
    <div>
      <p>Register to game {gameId}</p>
      {player
        ? <>
            <p>Welcome {player?.name}</p>
            <button onClick={handleStartClick}>Start</button>
        </>
        : <form onSubmit={handleRegisterPlayer}>
            <input name="name" type={'text'} />
            <button>Register</button>
          </form>
      }
    </div>
  )
}
