import { useState, useEffect } from "react";
import { useAppStore } from "../store/useApp";
import { useGameHub } from "../Context/GameHubContext";

const BALL_SPEED = 2;
const BALL_DIRECTION_X_KEY = "dkeyX";
const BALL_DIRECTION_Y_KEY = "dkeyY";

export default function Ball() {
	const {
		setBallPositionX,
		setBallPositionY,
		ballPositionX,
		ballPositionY,
		gameHeight,
		gameWidth,
		bar1PositionX,
		isMoving,
		changeScore1,
		changeScore2,
		triggerIsMoving,
	} = useAppStore();

	const { gameHubConnection } = useGameHub();

	const gameRunnerSocket = async () => {
		if (gameHubConnection) {
			await gameHubConnection.send("GameRunner");
		}
	};

	useEffect(() => {
		if (isMoving) {
			const interval = setInterval(gameRunnerSocket, 16);
			return () => clearInterval(interval);
		}
	}, [isMoving]);

	const handleBallMovementFromSocket = (ball: any) => {
		setBallPositionX(ball.ballPositionX);
		setBallPositionY(ball.ballPositionY);
	};

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.on("GameRun", handleBallMovementFromSocket);
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.off("GameRun", handleBallMovementFromSocket);
			}
		};
	}, [gameHubConnection]);

	const resetRound = async () => {
		if (gameHubConnection) {
			await gameHubConnection.send("ResetRound");
		}
	};

	useEffect(() => {
		if (ballPositionY <= 0) {
			changeScore1(1);
			resetRound();
		} else if (ballPositionY >= gameHeight) {
			resetRound();
			return changeScore2(1);
		}
	}, [ballPositionY]);

	useEffect(() => {
		const prevDirectionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
		const prevDirectionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
		// sol parçaya çarparsa
		if (ballPositionY > gameHeight - 50) {
			if (ballPositionX >= bar1PositionX && ballPositionX <= bar1PositionX + 30) {
				localStorage.setItem(BALL_DIRECTION_X_KEY, `${prevDirectionX * 1}`);
				localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY * -1}`);
			}

			// orta kısımlar
			else if (ballPositionX > bar1PositionX + 100 && ballPositionX <= bar1PositionX + 100) {
				localStorage.setItem(BALL_DIRECTION_X_KEY, `${prevDirectionX * 0}`);
				localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY * -1}`);
			}

			// sağ parça
			else if (ballPositionX > bar1PositionX + 30 && ballPositionX <= bar1PositionX + 160) {
				localStorage.setItem(BALL_DIRECTION_X_KEY, `${prevDirectionX * -1}`);
				localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY * -1}`);
			}
		}
	}, [ballPositionY, ballPositionX]);

	useEffect(() => {
		if (!isMoving) {
			localStorage.setItem(BALL_DIRECTION_Y_KEY, `${Math.random() > 0.5 ? -1 : 1}`);
			localStorage.setItem(BALL_DIRECTION_X_KEY, `${Math.random() > 0.5 ? -1 : 1}`);
			const timer = setTimeout(() => {
				triggerIsMoving();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isMoving]);

	useEffect(() => {
		if (ballPositionX + 20 >= gameWidth || ballPositionX <= 0) {
			const prevDirectionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
			const prevDirectionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
			localStorage.setItem(BALL_DIRECTION_X_KEY, `${prevDirectionX * -1}`);
			localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY}`);
		}
	}, [ballPositionX, ballPositionY]);

	return (
		<div>
			<div
				style={{
					borderRadius: "50%",
					position: "absolute",
					left: ballPositionX,
					top: ballPositionY,
					width: "20px",
					height: "20px",
					backgroundColor: "black",
				}}></div>
		</div>
	);
}
