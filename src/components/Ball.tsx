import { useState, useEffect } from "react";
import { useAppStore } from "../store/useApp";


const BALL_SPEED = 2;
const BALL_DIRECTION_X_KEY = "dkeyX";
const BALL_DIRECTION_Y_KEY = "dkeyY";


export default function Ball() {
 
  const {moveBallPositionX,moveBallPositionY,ballPositionX,ballPositionY,gameHeight,gameWidth,gameX,gameY} = useAppStore();

  const [isMoving, setIsMoving] = useState(false);

  const handleBallMovement = () => {
    
    const directionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
    const directionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
    moveBallPositionX(directionX * BALL_SPEED*5);
    moveBallPositionY(directionY * BALL_SPEED);
  };

 
  useEffect(() => {
    if (isMoving) {
      const interval = setInterval(handleBallMovement, 16);
      return () => clearInterval(interval);
    }
  }, [isMoving]);

  useEffect(() => {
    localStorage.setItem(BALL_DIRECTION_Y_KEY, `${Math.random()> 0.5 ? -1:1 }`)
    localStorage.setItem(
        BALL_DIRECTION_X_KEY,
        `${Math.random() > 0.5 ? -1 : 1}`,
        
      );
    const timer = setTimeout(() => {
      setIsMoving(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

   useEffect(()=> {
   if((ballPositionX + 20) >= gameWidth || ballPositionX <= 0){
    const prevDirectionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
    const prevDirectionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
    localStorage.setItem(BALL_DIRECTION_X_KEY,`${prevDirectionX * -1}`);
    localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY}`);
   }

   },[ballPositionX,ballPositionY]);

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
