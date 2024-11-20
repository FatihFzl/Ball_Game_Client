import  { useState, useEffect } from "react";

export default function Character() {
  const [position, setPosition] = useState(0);

 

  const handleKeyDown = (event: KeyboardEvent) => {
    var cubuk = document.getElementById("cubuk");
    console.log("+",cubuk?.getBoundingClientRect() );
    console.log("Positon", position);
    const step = 10;

    setPosition((prevPosition) => {
      if (event.key === "ArrowRight") {
        return  Math.min(prevPosition + step,1180);
      } else if (event.key === "ArrowLeft") {
        return Math.max(prevPosition - step, 0);
      }
      return prevPosition;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div id = "cubuk"
        style={{
          position: "absolute",
          left: `${position}px`,
          bottom: "10px",
          width: "40px",
          height: "20px",
          backgroundColor: "blue",
        }}
      ></div>
    </div>
  );
}
