import { Link, useParams, useNavigate } from "react-router-dom";
import { Player } from "../game/PlayerLabel";
import React, { useCallback } from "react";
import { useGame } from "src/connection/GameProvider";
import { Colors } from "../Colors";

export const Register = () => {
  const { gameId, userId } = useParams();
  const navigate = useNavigate();

  const { player, updatePlayer, sendStart } = useGame();

  const handleRegisterPlayer = useCallback((event) => {
    event.preventDefault();
    updatePlayer((prevPlayer) => ({
      ...prevPlayer,
      name: event.target.name.value,
    }));
  }, []);

  const handleColorClick = useCallback((color) => {
    updatePlayer((prevPlayer) => ({
      ...prevPlayer,
      color,
    }));
  }, []);

  const handleStartClick = useCallback(() => {
    sendStart();
    navigate(`/controller/${gameId}/user/${userId}/play`);
  }, []);

  return (
    <div>
      <p>Register to game {gameId}</p>
      {player.name ? (
        <>
          <p>Welcome {player.name}</p>
          <button onClick={handleStartClick}>Start</button>
        </>
      ) : (
        <form onSubmit={handleRegisterPlayer}>
          <input name="name" type={"text"} />
          <button>Register</button>
        </form>
      )}

      {Object.keys(Colors).map((color) => (
        <div
          key={color}
          onClick={() => handleColorClick(color)}
          style={{ backgroundColor: color }}
        >
          {player?.color === color ? ">" : ""}
          {color}
        </div>
      ))}
    </div>
  );
};
