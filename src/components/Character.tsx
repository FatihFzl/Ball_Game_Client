import { useCallback, useEffect } from "react";
import { useGameHub } from "../Context/GameHubContext";
import { useAppStore } from "../store/useApp";

export default function Character() {
	const { bar1PositionX, bar1PositionY } = useAppStore();

	const { gameHubConnection } = useGameHub();

	const handleKeyDown = useCallback(
		async (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				await gameHubConnection?.send("MoveCharacterRight");
			} else if (event.key === "ArrowLeft") {
				await gameHubConnection?.send("MoveCharacterLeft");
			}
		},
		[gameHubConnection]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [gameHubConnection, handleKeyDown]);

	return (
		<div>
			<div
				id="cubuk"
				style={{
					position: "absolute",
					left: `${bar1PositionX}px`,
					bottom: `${bar1PositionY}px`,
					display: bar1PositionY !== null ? "block" : "none",
					width: "160px",
					height: "20px",
					backgroundColor: "blue",
					transition: "all 0.1 linear",
				}}></div>
		</div>
	);
}
