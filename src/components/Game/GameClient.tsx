import { useEffect, useCallback } from "react";
import { useGameHub } from "../../Context/GameHubContext";
import { useAppStore } from "../../store/useApp";
import Ball from "../Ball";
import Character from "../Character";
import Opponent from "../Opponent";

const GameClient = () => {
	const {
		gameHeight,
		gameWidth,
		gameX,
		gameY,
		Player1Score,
		Player2Score,
		setBar1PositionX,
		setPlayer1Score,
	    setPlayer2Score,
		setBar1PositionY,
		setBar2PositionX,
		setBar2PositionY,
	} = useAppStore();
	const { gameHubConnection } = useGameHub();

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.send("InitCharacters");
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.send("LeaveGame");
			}
		};
	}, [gameHubConnection]);

	const handleBar1MovementFromSocket = useCallback((bar: any) => {
		console.log(bar);
		setBar1PositionX(bar.barPositionX);
		setBar1PositionY(bar.barPositionY);
	}, []);

	const handleBar2MovementFromSocket = useCallback((bar: any) => {
		setBar2PositionX(bar.barPositionX);
		setBar2PositionY(bar.barPositionY);
	}, []);


const handleGameScores = ((player1Score: number,player2Score: number) => {
            setPlayer1Score(player1Score);
			setPlayer2Score(player2Score);
	});

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.on("CharacterReciever", handleBar1MovementFromSocket);
			gameHubConnection.on("OpponentReciever", handleBar2MovementFromSocket);
			gameHubConnection.on("ScoreReciever",handleGameScores );
			gameHubConnection.on("BallRunnerClientReciever", () => {
				gameHubConnection.send("BallRunner");
			});
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.off("CharacterReciever", handleBar1MovementFromSocket);
				gameHubConnection.off("OpponentReciever", handleBar2MovementFromSocket);
				gameHubConnection.off("ScoreReciever",handleGameScores );
			gameHubConnection.off("BallRunnerClientReciever", () => {
				gameHubConnection.send("BallRunner");
			});
			}
		};
	}, [gameHubConnection]);

	return (
		<div>
			<div
				style={{
					position: "absolute",
					top: 0,
				}}>
				{Player1Score}-{Player2Score}
			</div>
			<div
				style={{
					position: "absolute",
					height: gameHeight,
					width: gameWidth,
					backgroundColor: "purple",
					top: gameY,
					left: gameX,
				}}>
				<Character />
				<Opponent />
				<Ball />
			</div>
		</div>
	);
};

export default GameClient;
