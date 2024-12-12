import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";


export const GameHubConnectionContext =
	createContext<{disconnectHubConnection: () => void, gameHubConnection: HubConnection| undefined }>({
		disconnectHubConnection: () => {},
		gameHubConnection: undefined,
	});

const GameHubProvider: FC<{children:ReactNode}> = ({ children }) => {
	const [gameHubConnection, setGameHubConnection] = useState<HubConnection>();

	const connectHub = async () => {
		const newConnection = new HubConnectionBuilder()
			.withUrl(`http://localhost:5213/gameHub`)
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();
		
		await newConnection.start();
		setGameHubConnection(newConnection);
	};

	const disconnectHubConnection = () => {
		if (gameHubConnection) {
			gameHubConnection.stop();
			setGameHubConnection(undefined);
		}
	};

	useEffect(() => {
		connectHub();
		return () => {
			if (gameHubConnection) {
				disconnectHubConnection();
			}
		};
	}, []);

	return (
		<GameHubConnectionContext.Provider
			value={{ gameHubConnection, disconnectHubConnection }}>
			{children}
		</GameHubConnectionContext.Provider>
	);
};

export default GameHubProvider;
export const useGameHub = () => useContext(GameHubConnectionContext);
