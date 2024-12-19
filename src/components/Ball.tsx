import { useEffect, useRef, useState } from "react";
import { useGameHub } from "../Context/GameHubContext";
import { useAppStore } from "../store/useApp";

export default function Ball() {
	const {
		setBallPositionX,
		setBallPositionY,
		ballPositionX,
		ballPositionY,
		isMoving,
		triggerIsMoving,
	} = useAppStore();

	const [intervalId, setIntervalId] = useState<number>();

	const { gameHubConnection } = useGameHub();

	const ballRunnerSocket = async () => {
		if (gameHubConnection) {
			await gameHubConnection.send("BallRunner");
		}
	};

	const handleBallMovementFromSocket = (ball: any) => {
		setBallPositionX(ball.ballPositionX);
		setBallPositionY(ball.ballPositionY);
	};

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.on("BallReciever", handleBallMovementFromSocket);
			gameHubConnection.on("ResetRoundReciever", () => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
			});
		}

		return () => {
			if (gameHubConnection) {
				gameHubConnection.off("BallReciever", handleBallMovementFromSocket);
				gameHubConnection.off("ResetRoundReciever", () => {
					triggerIsMoving();
				});
			}
		};
	}, [gameHubConnection]);

	useEffect(() => {
		if (!isMoving) {
			const timer = setTimeout(() => {
				triggerIsMoving();
			}, 3000);
			return () => clearTimeout(timer);
		}

		if (isMoving) {
			const newInterval = setInterval(ballRunnerSocket, 16);
			setIntervalId(newInterval);
			console.log("newInterval", newInterval);
			return () => clearInterval(intervalId);
		}
	}, [isMoving]);

	return (
		<div>
			<div
				style={{
					borderRadius: "50%",
					position: "absolute",
					left: ballPositionX,
					bottom: ballPositionY,
					width: "20px",
					height: "20px",
					backgroundColor: "black",
				}}></div>
		</div>
	);
}
