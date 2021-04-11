import React from "react";
import "./index.css";
import ProfileAvatar from "../profile-avatar";

export default class FriendDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.friendName,
      initials: this.props.friendInitials,
    };
  }

  render() {
    return (
      <div
        className="friend-details-div"
        onClick={() => {
          if (typeof this.props.onClick === "function") {
            this.props.onClick(this.state.name);
          }
        }}
      >
        <ProfileAvatar
          value={this.state.initials}
          className="friend-details-profile-avatar"
        />
        <div className="friend-details-name">{this.state.name}</div>
      </div>
    );
  }
}
