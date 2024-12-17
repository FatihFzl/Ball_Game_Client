import { useAppStore } from "../store/useApp";

export default function Opponent() {
  const { bar2PositionX, bar2PositionY } = useAppStore();
  return (
    <div>
      <div
        id="cubuk"
        style={{
          position: "absolute",
          left: `${bar2PositionX}px`,
          bottom: `${bar2PositionY}px`,
          display: bar2PositionY? "block": "none",
          width: "160px",
          height: "20px",
          backgroundColor: "red",
          transition: "all 0.1 linear",
        }}
      ></div>
    </div>
  );
}
