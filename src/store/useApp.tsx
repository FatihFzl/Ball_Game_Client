import { create } from "zustand";

type AppStore = {
  gameWidth: number;
  gameHeight: number;
  ballPositionX: number;
  ballPositionY: number;
  setBallPositionX: (newPositionX: number) => void;
  moveBallPositionX: (incPositionX: number) => void;
  setBallPositionY: (newPositionY: number) => void;
  moveBallPositionY: (incPositionY: number) => void;
  setBar1PositionX: (newPositionX: number) => void;
  moveBar1PositionX: (incPositionX:number) => void;
  gameX: number;
  gameY: number;
  bar1PositionX: number;
  bar2PositionX: number;
};
export const useAppStore = create<AppStore>((set) => ({
  gameWidth: 1300,
  gameHeight: 650,
  ballPositionX: 650,
  ballPositionY: 325,
  gameX: 100,
  gameY: 20,
  bar1PositionX: 0,
  bar2PositionX: 0,
 
    
  

  setBar1PositionX: (newPositionX: number) =>
    set(()=> ({bar1PositionX: newPositionX})),

  moveBar1PositionX: (incPositionX: number) =>
    set((state)=> ({bar1PositionX: state.bar1PositionX+incPositionX})),
 
  
  setBallPositionX: (newPositionX: number) =>
    set(()=> ({ballPositionX: newPositionX})),

  moveBallPositionX: (incPositionX: number) =>
    set((state)=> ({ballPositionX: state.ballPositionX+incPositionX})),

  setBallPositionY:(newPositionY: number) =>
    set({ ballPositionY: newPositionY }),

  moveBallPositionY: (incPositionY: number) =>
    set((state)=> ({ballPositionY: state.ballPositionY+incPositionY})),
}));
