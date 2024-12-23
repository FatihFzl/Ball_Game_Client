import { useEffect } from "react";
import { useGameHub } from "../Context/GameHubContext";
import { useAppStore } from "../store/useApp";

export default function Ball() {
	const {
		setBallPositionX,
		setBallPositionY,
		ballPositionX,
		ballPositionY,
		triggerIsMoving,
	} = useAppStore();

	const { gameHubConnection } = useGameHub();

	const handleBallMovementFromSocket = (ball: any) => {
		setBallPositionX(ball.ballPositionX);
		setBallPositionY(ball.ballPositionY);
	};

	useEffect(() => {
		if (gameHubConnection) {
			gameHubConnection.on("BallReciever", handleBallMovementFromSocket);
			gameHubConnection.on("ResetRoundReciever", () => {
				
			});
			gameHubConnection.on("BallRunnerClientReciever", () => {
        
				gameHubConnection.send("BallRunner","TESTGAME");
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
