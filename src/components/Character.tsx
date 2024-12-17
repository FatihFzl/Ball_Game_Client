import { useState, useEffect } from "react";
import { useAppStore } from "../store/useApp";
import { useGameHub } from "../Context/GameHubContext";

export default function Character() {
  const {
    bar1PositionX,
    moveBar1PositionX,
    gameWidth,
    setBar1PositionX,
    score1,
    score2,
  } = useAppStore();
  // const [position, setPosition] = useState(0);

  // console.log("score1: " + score1);
  //console.log("score2: " + score2);

  const handleBar1MovementFromSocket = (bar: any) => {
    setBar1PositionX(bar.bar1PositionX);
  };

  const { gameHubConnection } = useGameHub();

  useEffect(() => {
    if (gameHubConnection) {
      gameHubConnection.on("Character1Reciever", handleBar1MovementFromSocket);
    }

    return () => {
      if (gameHubConnection) {
        gameHubConnection.off(
          "Character1Reciever",
          handleBar1MovementFromSocket
        );
      }
    };
  }, [gameHubConnection]);

  
  const handleKeyDown = async (event: KeyboardEvent) => {
    
    if (event.key === "ArrowRight") {
      
    await gameHubConnection?.send("MoveCharacter1Right");
    } else if (event.key === "ArrowLeft") {
     
     await gameHubConnection?.send("MoveCharacter1Left");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameHubConnection]);

  return (
    <div>
      <div
        id="cubuk"
        style={{
          position: "absolute",
          left: `${bar1PositionX}px`,
          bottom: "10px",
          width: "160px",
          height: "20px",
          backgroundColor: "blue",
          transition: "all 0.1 linear",
        }}
      ></div>
    </div>
  );
}
