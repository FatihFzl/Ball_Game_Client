import { useEffect } from "react";
import { useGameHub } from "../Context/GameHubContext";
import { useAppStore } from "../store/useApp";

export default function Ball() {
  const {
    setBallPositionX,
    setBallPositionY,
    ballPositionX,
    ballPositionY,
    gameHeight,
    isMoving,
    changeScore1,
    changeScore2,
    triggerIsMoving,
  } = useAppStore();

  const { gameHubConnection } = useGameHub();

  const ballRunnerSocket = async () => {
    if (gameHubConnection) {
      await gameHubConnection.send("BallRunner");
    }
  };

  useEffect(() => {
    if (isMoving) {
      const interval = setInterval(ballRunnerSocket, 16);
      return () => clearInterval(interval);
    }
  }, [isMoving]);

  const handleBallMovementFromSocket = (ball: any) => {
    setBallPositionX(ball.ballPositionX);
    setBallPositionY(ball.ballPositionY);
  };

  useEffect(() => {
    if (gameHubConnection) {
      gameHubConnection.on("BallReciever", handleBallMovementFromSocket);
    }

    return () => {
      if (gameHubConnection) {
        gameHubConnection.off("BallReciever", handleBallMovementFromSocket);
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
    if (!isMoving) {
      const timer = setTimeout(() => {
        triggerIsMoving();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMoving]);

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
        }}
      ></div>
    </div>
  );
}
