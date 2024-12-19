import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Player from "../components/Player";
import { useGameHub } from "../Context/GameHubContext";

export type ReadyState = { player1: boolean; player2: boolean };
const GROUP_ID = "TESTGAME";

const Home = () => {
	const navigate = useNavigate();
	const { gameHubConnection } = useGameHub();
	const [playerCount, setPlayerCount] = useState(0);
	const [playerName, setPlayerName] = useState("Player 1");

	function handlePlayerNameChange(newName: string) {
		setPlayerName(newName);
	}

	const setPlayerCountSocket = (userName: string, playerCount: number) => {
		setPlayerCount(playerCount);
	};

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.send("JoinGame", playerName, GROUP_ID);

			gameHubConnection.on("JoinGameReciever", setPlayerCountSocket);
			gameHubConnection.on("StartGameReciever", () => {
				navigate("/game");
			});
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.off("JoinGameReciever", setPlayerCountSocket);
			}
		};
	}, [gameHubConnection]);

	function handleStartGame() {
		if (gameHubConnection) {
			gameHubConnection.send("StartGame", GROUP_ID);
		}
	}

	return (
		<div>
			<Header />
			<div id="players" className="highlight_player">
				<Player
					initialName={playerName}
					onChangeName={handlePlayerNameChange}
					isReady={true}
					playerType="player1"
					readyTrigger={() => {}}
				/>
				{playerCount > 1 && (
					<div style={{ width: "200px", height: "200px", backgroundColor: "red" }}></div>
				)}
			</div>

			{playerCount > 1 && (
				<button className="start_game__button" onClick={handleStartGame}>
					Start Game
				</button>
			)}
		</div>
	);
};

export default Home;
