import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainMenu from "./main-menu";
import ChatMenu from "./chat-menu";

class Ui extends React.Component {
  render() {
    return (
      <div className="fullscreen">
        <MainMenu />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Ui />, document.getElementById("root"));
