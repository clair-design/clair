import { render } from "react-dom";
import React from "react";
import * as Icons from "./index";
import "./styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <>
        {Object.entries(Icons)
          .filter(([,svg]) => typeof svg === "string")
          .map(([name, svg], index) => {
            return (
              <div
                className="icon-container"
                key={index}
                title={name}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            );
          })}
      </>
    );
  }
}

render(<App />, document.getElementById("app"));
