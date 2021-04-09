import React from 'react';
import "./index.css";
import "../../index.css";
import "../../../index.css";

export default class RegisterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="main-menu-button register-button m-2 chat-app-button-default"
          name="register-button"
          onClick={this.props.onClick}
        >
          Register
        </button>
      </React.Fragment>
    );
  }
}
