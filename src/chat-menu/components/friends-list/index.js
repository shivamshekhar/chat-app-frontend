import React from "react";
import "./index.css";
import FriendDetails from "../friend-details";

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  _getInitials(name) {
    if (name && typeof name === "string") {
      const nameArr = name.split(" ");
      if (nameArr.length > 1) {
        return (
          nameArr[0].substr(0, 1) + nameArr[1].substr(0, 1)
        ).toUpperCase();
      } else if (name.length > 1) {
        return name.substr(0, 2).toUpperCase();
      } else {
        return name.toUpperCase();
      }
    }
  }

  _selectFriend(name) {
    this.props.selectFriend(name);
  }

  render() {
    const friends = [];
    const friendsList = this.props.friendsList || [];
    for (let i = friendsList.length - 1; i >= 0; i -= 1) {
      friends.push(
        <FriendDetails
          key={i}
          friendName={friendsList[i].name}
          friendInitials={this._getInitials(friendsList[i].name)}
          onClick={this._selectFriend.bind(this)}
        />
      );
    }

    return (
      <div className="friends-list-outer-div">
        <div className="friends-list-inner-div">{friends}</div>
      </div>
    );
  }
}
