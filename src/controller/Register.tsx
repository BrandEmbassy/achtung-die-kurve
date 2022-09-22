import { Link, useParams } from 'react-router-dom'
import { Player } from '../game/PlayerLabel';
import React  from 'react';

interface RegisterProps {
  player?: Player;
  updatePlayer: (player: Player) => void;
}

export const Register: React.FC<RegisterProps> = (props) => {
  const {gameId, userId} = useParams()

  const handleRegisterPlayer = (event) => {
    event.preventDefault();
    props.updatePlayer({
      playerId: userId,
      name: event.currentTarget.name.value,
      color: '#0492C2',
    });
  }

  return (
    <div>
      <p>Register to game {gameId}</p>
      {props.player
        ? <>
            <p>Welcome {props.player?.name}</p>
            <Link to={`/controller/${gameId}/play/${userId}`}>Start</Link>
        </>
        : <form onSubmit={handleRegisterPlayer}>
            <input name="name" type={'text'} />
            <button>Register</button>
          </form>
      }
    </div>
  )
}


