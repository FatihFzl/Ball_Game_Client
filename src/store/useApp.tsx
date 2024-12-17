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
  setScore1: (newScore1: number) => void;
  changeScore1: (incScore1: number) => void;
  setScore2: (newScore2: number) => void;
  changeScore2: (incScore2: number) => void;

  gameX: number;
  gameY: number;
  bar1PositionX: number | null;
  bar1PositionY: number | null;
  bar2PositionX: number | null;
  bar2PositionY: number | null;
  score1: number;
  score2: number;
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
  score1: 0,
  score2: 0,
  isMoving: false,
};

export const useAppStore = create<AppStore>((set, _appStore) => ({
  ...initialState,

  triggerIsMoving: () => set((state) => ({ isMoving: !state.isMoving })),

  // First Player Score
  setScore1: (newScore1: number) => set(() => ({ score1: newScore1 })),

  changeScore1: (incScore1: number) =>
    set((state) => ({
      score1: state.score1 + incScore1,
      isMoving: !state.isMoving,
    })),

  // Second Player Score
  setScore2: (newScore2: number) => set(() => ({ score2: newScore2 })),

  changeScore2: (incScore2: number) =>
    set((state) => ({
      score2: state.score2 + incScore2,
      isMoving: !state.isMoving,
    })),

  // Movement for Player 1
  setBar1PositionX: (newPositionX: number) =>
    set(() => ({ bar1PositionX: newPositionX })),

  setBar1PositionY: (newPositionY: number) =>
    set(() => ({ bar1PositionY: newPositionY })),

  // Movement for Player 2
  setBar2PositionX: (newPositionX: number) =>
    set(() => ({ bar2PositionX: newPositionX })),

  setBar2PositionY: (newPositionY: number) =>
    set(() => ({ bar2PositionY: newPositionY })),

  // Ball Movement on X-Axis
  setBallPositionX: (newPositionX: number) =>
    set(() => ({ ballPositionX: newPositionX })),

  // Ball Movement on Y-Axis
  setBallPositionY: (newPositionY: number) =>
    set({ ballPositionY: newPositionY }),
}));
