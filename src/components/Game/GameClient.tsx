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
		score1,
		score2,
		setBar1PositionX,
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

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.on("CharacterReciever", handleBar1MovementFromSocket);
			gameHubConnection.on("OpponentReciever", handleBar2MovementFromSocket);
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.off("CharacterReciever", handleBar1MovementFromSocket);
				gameHubConnection.off("OpponentReciever", handleBar2MovementFromSocket);
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
				{score1}-{score2}
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