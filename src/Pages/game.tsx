import Character from "../components/Character";
import Ball from "../components/Ball";
import { useAppStore } from "../store/useApp";
import { useGameHub } from "../Context/GameHubContext";
import { Component, useEffect } from "react";

const Game = () => {
  const { gameHeight, gameWidth, gameX, gameY, score1, score2, ballPositionX,ballPositionY } = useAppStore();
  const { gameHubConnection } = useGameHub();

  const pongHandler =  (data: any) => {
    console.log("from server: ",data) 
  }

  //const ballPositionHandler = (dataX: any, dataY: any) => {console.log("from server: ", dataX,dataY) }

  
  //useEffect(()=> {if(gameHubConnection){gameHubConnection.on("Ball", ballPositionHandler);}return console.log(gameHubConnection?.send("BallPosition", ballPositionX,ballPositionY));},[gameHubConnection]);

  useEffect(() => {
    if (gameHubConnection) {
      gameHubConnection.on("Pong",pongHandler);
    }
    return () => gameHubConnection?.off("Pong",pongHandler);
  }, [gameHubConnection]);

  return (
    <div>
      
      <div
        style={{
          position: "absolute",
          top: 0,
        }}
      >
        <button onClick={async ()=> {
        await gameHubConnection?.send("Ping","deneme")
        
      }}> TEST</button>
        {score1}-{score2}
      </div>
      <div
        style={{
          position: "absolute",
          height: gameHeight,
          width: gameWidth,
          backgroundColor: "purple",
          top: gameY,
          left: gameX,
        }}
      >
        <Character />
        <Ball />
      </div>
    </div>
  );
};

export default Game;
