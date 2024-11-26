
import Character from "../components/Character";
import Ball from "../components/Ball";
import { useAppStore } from "../store/useApp";

const Game = () => {

    const {gameHeight,gameWidth,gameX,gameY} = useAppStore();
    return (
        <div style={{position:"absolute" ,height:gameHeight,width: gameWidth,backgroundColor:"purple", top:gameY,left:gameX}}>
            
            <Character/>
            <Ball/>
        </div>
    );
};

export default Game;