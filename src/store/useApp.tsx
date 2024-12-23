import { create } from "zustand";

type AppStore = {
	gameWidth: number;
	gameHeight: number;
	ballPositionX: number;
	ballPositionY: number;
	isMoving: boolean;
	triggerIsMoving: () => void;
	setBallPositionX: (newPositionX: number) => void;
	setBallPositionY: (newPositionY: number) => void;
	setBar1PositionX: (newPositionX: number) => void;
	setBar1PositionY: (newPositionY: number) => void;
	setBar2PositionX: (newPositionX: number) => void;
	setBar2PositionY: (newPositionY: number) => void;
	setPlayer1Score: (newPlayer1Score: number) => void;
	changePlayer1Score: (incPlayer1Score: number) => void;
	setPlayer2Score: (newPlayer2Score: number) => void;
	changePlayer2Score: (incPlayer2Scores: number) => void;
	resetStates: () => void;

	gameX: number;
	gameY: number;
	bar1PositionX: number | null;
	bar1PositionY: number | null;
	bar2PositionX: number | null;
	bar2PositionY: number | null;
	Player1Score: number;
	Player2Score: number;
};

const initialState = {
	gameWidth: 1300,
	gameHeight: 650,
	ballPositionX: 650,
	ballPositionY: 325,
	gameX: 100,
	gameY: 20,
	bar1PositionX: null,
	bar2PositionX: null,
	bar1PositionY: null,
	bar2PositionY: null,
	Player1Score: 0,
	Player2Score: 0,
	isMoving: false,
};

export const useAppStore = create<AppStore>((set, _appStore) => ({
	...initialState,

	triggerIsMoving: () => set((state) => ({ isMoving: !state.isMoving })),

	// First Player Score
	setPlayer1Score: (newPlayer1Score: number) => set(() => ({ Player1Score: newPlayer1Score })),

	changePlayer1Score: (incPlayer1Score: number) =>
		set((state) => ({
			Player1Score: state.Player1Score + incPlayer1Score,
			isMoving: !state.isMoving,
		})),

	// Second Player Score
	setPlayer2Score: (newPlayer2Score: number) => set(() => ({ Player2Score: newPlayer2Score })),

	changePlayer2Score: (incPlayer2Score: number) =>
		set((state) => ({
			Player2Score: state.Player2Score + incPlayer2Score,
			isMoving: !state.isMoving,
		})),

	// Movement for Player 1
	setBar1PositionX: (newPositionX: number) => set(() => ({ bar1PositionX: newPositionX })),

	setBar1PositionY: (newPositionY: number) => set(() => ({ bar1PositionY: newPositionY })),

	// Movement for Player 2
	setBar2PositionX: (newPositionX: number) => set(() => ({ bar2PositionX: newPositionX })),

	setBar2PositionY: (newPositionY: number) => set(() => ({ bar2PositionY: newPositionY })),

	// Ball Movement on X-Axis
	setBallPositionX: (newPositionX: number) => set(() => ({ ballPositionX: newPositionX })),

	// Ball Movement on Y-Axis
	setBallPositionY: (newPositionY: number) => set({ ballPositionY: newPositionY }),

	resetStates: () => set(() => ({ ...initialState })),
}));
