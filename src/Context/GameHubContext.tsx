import {
	HubConnection,
	HubConnectionBuilder,
	HubConnectionState,
	LogLevel,
} from "@microsoft/signalr";
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

export const GameHubConnectionContext = createContext<{
	disconnectHubConnection: () => void;
	gameHubConnection: HubConnection | undefined;
}>({
	disconnectHubConnection: () => {},
	gameHubConnection: undefined,
});

const GameHubProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [gameHubConnection, setGameHubConnection] = useState<HubConnection>();

	const connectHub = useCallback(async () => {
		const newConnection = new HubConnectionBuilder()
			.withUrl(`${import.meta.env.NEXT_PUBLIC_API_BASE_URL}/gameHub`)
			.withAutomaticReconnect()
			.configureLogging(LogLevel.Information)
			.build();
		await newConnection.start();
		setGameHubConnection(newConnection);
	}, []);

	const disconnectHubConnection = useCallback(() => {
		if (gameHubConnection) {
			gameHubConnection.stop();
			setGameHubConnection(undefined);
		}
	}, []);

	useEffect(() => {
		if (
			!gameHubConnection ||
			(gameHubConnection.state !== HubConnectionState.Connected &&
			gameHubConnection.state !== HubConnectionState.Connecting)
		) {
			connectHub();
		}

		return () => {
			if (gameHubConnection) {
				console.log("Disconnecting from hub");
				disconnectHubConnection();
			}
		};
	}, [gameHubConnection?.state]);

	return (
		<GameHubConnectionContext.Provider value={{ gameHubConnection, disconnectHubConnection }}>
			{children}
		</GameHubConnectionContext.Provider>
	);
};

export default GameHubProvider;
export const useGameHub = () => useContext(GameHubConnectionContext);
