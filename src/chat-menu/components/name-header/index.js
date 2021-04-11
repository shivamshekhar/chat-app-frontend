import React from "react";
import ProfileAvatar from "../profile-avatar";
import "./index.css";

export default class NameHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  _getInitials(name) {
    if(name && typeof(name) === 'string') {
      const nameArr = name.split(' ');
      if(nameArr.length > 1) {
        return (nameArr[0].substr(0,1) + nameArr[1].substr(0,1)).toUpperCase();
      } else if(name.length > 1) {
        return name.substr(0, 2).toUpperCase();
      } else {
        return name.toUpperCase();
      }
    }
  }

  render() {
    return (<div className="name-header-div">
      <ProfileAvatar value={this._getInitials(this.props.friendName)}/>
      <div className="profile-text-div">{this.props.friendName}</div>
    </div>);
  }
}
