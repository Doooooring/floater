/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import "./App.css";
import Float from "./component/float";
import { FloatContext } from "./context/floatContext";

function App() {
  const [maxZ, setMaxZ] = useState<number>(0);

  const getMaxZ = useCallback(() => {
    const ne = maxZ + 1;
    setMaxZ(ne);
    return ne;
  }, [maxZ, setMaxZ]);

  return (
    <div className="App">
      <FloatContext.Provider value={{ getMaxZ }}>
        {["red", "blue", "green", "grey", "orange"].map((color, index) => (
          <Float
            key={index}
            style={css`
              width: 100px;
              height: 100px;
              background-color: ${color};
            `}
          ></Float>
        ))}
      </FloatContext.Provider>
    </div>
  );
}

export default App;
