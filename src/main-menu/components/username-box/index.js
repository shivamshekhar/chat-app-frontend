import React from 'react';
import "./index.css";
import "../../index.css";
import "../../../index.css";

export default class UserNameTextBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <input
          className="main-menu-text-input main-menu-username m-1"
          type="text"
          placeholder="Enter your user name"
          onChange={(text) => this.props.onChange(text.target.value)}
          required
          disabled={this.props.isLoading}
        />
      </React.Fragment>
    );
  }
}
