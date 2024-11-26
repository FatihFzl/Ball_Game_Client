import { useState, useEffect } from "react";
import { useAppStore } from "../store/useApp";

export default function Character() {
  const { bar1PositionX, moveBar1PositionX, gameWidth } = useAppStore();
  // const [position, setPosition] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    var cubuk = document.getElementById("cubuk");
    console.log("+", cubuk?.getBoundingClientRect());
    console.log("Positon", bar1PositionX);
    const step = 20;
   
    if (event.key === "ArrowRight") {
      console.log(useAppStore.getState().bar1PositionX, gameWidth - 150);
      if (useAppStore.getState().bar1PositionX >= gameWidth - 160) return;
      return moveBar1PositionX(step);
    } else if (event.key === "ArrowLeft") {
      if (useAppStore.getState().bar1PositionX <= 0) return;
      return moveBar1PositionX(-step);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
