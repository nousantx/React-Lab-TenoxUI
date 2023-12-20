import { useEffect } from "react";
import TenoxUI, { Color } from "./TenoxUI";

import "./App.css";

function App() {
  useEffect(() => {
    Color();
    TenoxUI();
    // console.log(Color);
  }, []);
  return (
    <div className="ph-10% pv-0.5rem bg-0d0d0d display-flex flex-parent-center">
      <h1 className="fs-1rem mv-1rem tc-white ">Tenox</h1>
      <h1 className="fs-1rem mv-1rem tc-[primary] ">UI</h1>
      <h1 className="fs-1rem mv-1rem tc-white mh-1rem">x</h1>
      <h1 className="fs-1rem mv-1rem tc-cyan">ReactJS</h1>
    </div>
  );
}

export default App;
