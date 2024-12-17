import Character from "../components/Character";
import Ball from "../components/Ball";
import { useAppStore } from "../store/useApp";
import { useGameHub } from "../Context/GameHubContext";
import { Component, useEffect } from "react";
import Opponent from "../components/Opponent";

const Game = () => {
  const {
    gameHeight,
    gameWidth,
    gameX,
    gameY,
    score1,
    score2,
    setBar1PositionX,
    setBar1PositionY,
    setBar2PositionX,
    setBar2PositionY,
  } = useAppStore();
  const { gameHubConnection } = useGameHub();

  useEffect(() => {
    if (gameHubConnection) {
      gameHubConnection.send("InitCharacters");
    }
  }, [gameHubConnection]);

  const handleBar1MovementFromSocket = (bar: any) => {
    setBar1PositionX(bar.bar1PositionX);
    setBar1PositionY(bar.bar1PositionY);
  };

  const handleBar2MovementFromSocket = (bar: any) => {
    setBar2PositionX(bar.bar2PositionX);
    setBar2PositionY(bar.bar2PositionY);
  };

  useEffect(() => {
    if (gameHubConnection) {
      gameHubConnection.on("CharacterReciever", handleBar1MovementFromSocket);
      gameHubConnection.on("OpponentReciever", handleBar2MovementFromSocket);
    }

    return () => {
      if (gameHubConnection) {
        gameHubConnection.off(
          "CharacterReciever",
          handleBar1MovementFromSocket
        );
        gameHubConnection.off("OpponentReciever", handleBar2MovementFromSocket);
      }
    };
  }, [gameHubConnection]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
        }}
      >
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
        <Opponent />
        <Ball />
      </div>
    </div>
  );
};

export default Game;
