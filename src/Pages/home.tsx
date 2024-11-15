import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Player from "../components/Player";

export type ReadyState = { player1: boolean; player2: boolean };

const Home = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState({});

  const [playerReady, setPlayerReady] = useState<ReadyState>({
    player1: false,
    player2: false,
  });

  function handlePlayerNameChange(newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        newName,
      };
    });
  }

  function readyHandler(player: keyof ReadyState) {
    setPlayerReady((prevReady) => ({
      ...prevReady,
      [player]: !prevReady[player],
    }));
  }

  //   useEffect(() => {
  //     if (playerReady.player1 && playerReady.player2) {
  //       const timeoutId = setTimeout(() => navigate("/about"), 2000);
  //       return () => clearTimeout(timeoutId);
  //     }
  //   }, [playerReady]);

  function handleStartGame() {
    navigate("/game");
  }

  return (
    <div>
      <Header />
      <div id="players" className="highlight_player">
        <Player
          initialName="Player 1"
          onChangeName={handlePlayerNameChange}
          isReady={playerReady.player1}
          playerType="player1"
          readyTrigger={readyHandler}
        />
        <Player
          initialName="Player 2"
          onChangeName={handlePlayerNameChange}
          isReady={playerReady.player2}
          playerType="player2"
          readyTrigger={readyHandler}
        />
      </div>

      {playerReady.player1 && playerReady.player2 && (
        <button className="start_game__button" onClick={handleStartGame}>
          {" "}
          Start Game
        </button>
      )}
    </div>
  );
};

export default Home;
