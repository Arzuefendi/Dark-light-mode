import React, { useContext } from "react";
import ChangeModeContext from "../Context/ChangeModeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ModeButton = () => {
  const { mode, setMode } = useContext(ChangeModeContext);
  return (
    <div>
      <button className="btn1" onClick={() => setMode(!mode)}>
        <BsFillMoonStarsFill />
      </button>
    </div>
  );
};

export default ModeButton;
