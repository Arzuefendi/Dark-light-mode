import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo";
import ChangeModeContext from "./Context/ChangeModeContext";
function App() {
  const [mode, setMode] = useState(() => {
    const mode = JSON.parse(localStorage.getItem("darkMode"));
    return mode !== null ? mode : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(mode));
  }, [mode]);
  return (
    <ChangeModeContext.Provider value={{ mode, setMode }}>
      <div className={mode ? "dark-mode" : "light-mode"}>
        <Todo />
      </div>
    </ChangeModeContext.Provider>
  );
}

export default App;
