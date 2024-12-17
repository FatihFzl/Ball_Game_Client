import { useState } from "react";
import GameClient from "../components/Game/GameClient";
import { useGameHub } from "../Context/GameHubContext";
import { useAppStore } from "../store/useApp";

const Game = () => {
	const { resetStates } = useAppStore();
	const { gameHubConnection } = useGameHub();
	const [toggle, setToggle] = useState(true);

	const handleSetTogglle = () => {
		setToggle((prev) => !prev);
		gameHubConnection?.send("ResetGame");
		resetStates();
	};

	return (
		<div>
			<button style={{ position: "absolute", bottom: "0" }} onClick={handleSetTogglle}>
				test
			</button>
			{toggle ? <GameClient /> : null}
		</div>
	);
};

export default Game;
