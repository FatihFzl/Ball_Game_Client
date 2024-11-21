import { useState, useEffect } from "react";

const BALL_SPEED = 2;
const BALL_DIRECTION_X_KEY = "dkeyX";
const BALL_DIRECTION_Y_KEY = "dkeyY";

export default function Ball() {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
  });

  const [isMoving, setIsMoving] = useState(false);

  const handleBallMovement = () => {
    const directionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
    const directionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
    setPosition((prevPosition) => ({
      ...prevPosition,
      top: prevPosition.top + directionY * BALL_SPEED,
      left: prevPosition.left + directionX * BALL_SPEED*10,
    }));
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
   if((position.left + 20) > window.innerWidth || position.left < 0){
    const prevDirectionX = Number(localStorage.getItem(BALL_DIRECTION_X_KEY));
    const prevDirectionY = Number(localStorage.getItem(BALL_DIRECTION_Y_KEY));
    localStorage.setItem(BALL_DIRECTION_X_KEY,`${prevDirectionX * -1}`);
    localStorage.setItem(BALL_DIRECTION_Y_KEY, `${prevDirectionY}`);
   }

   },[position]);

  return (
    <div>
      <div
        style={{
          borderRadius: "50%",
          position: "absolute",
          left: position.left,
          top: position.top,
          width: "20px",
          height: "20px",
          backgroundColor: "black",
        }}
      ></div>
    </div>
  );
}
