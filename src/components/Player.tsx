import { SetStateAction, useState } from "react";
import { ReadyState } from "../Pages/home";

type Props = {
  initialName: string;
  isReady: boolean;
  playerType: keyof ReadyState;
  readyTrigger: (player: keyof ReadyState) => void;
  onChangeName: (newName: string) => void;
};

export default function Player(props: Props) {
  const [playerName, setPlayerName] = useState(props.initialName);
  const [isEditing, setIsEditing] = useState(false);

  function editHandler() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      props.onChangeName(playerName);
    }
  }

  function nameChanger(event: { target: { value: SetStateAction<string> } }) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player_name">{playerName} </span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={nameChanger} />
    );  
  }

  return (
    <div>
      <span className="player">{editablePlayerName}</span>
      <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>

      <p> {props.isReady ? `Ready` : `Not Ready`}</p>
      <button onClick={()=>{
        props.readyTrigger(props.playerType)
      }}> Set Ready</button>
    </div>
  );
}
