// import { useEffect } from "react";
// TenoxUI Styler
import Styler from "./Style";
import Navbar from "./component/Navbar";

function App() {
  Styler();
  console.log(Styler);

  return (
    <div className="pt-4rem">
      <Navbar />

      <div className="wrapper bg-0d0d0d fx-ctr">
        <h1 className="tc-white ">Tenox</h1>
        <h1 className="tc-[primary] ">UI</h1>
        <h1 className="tc-white mh-1rem">x</h1>
        <h1 className="tc-cyan">ReactJS</h1>
      </div>
    </div>
  );
}

export default App;
