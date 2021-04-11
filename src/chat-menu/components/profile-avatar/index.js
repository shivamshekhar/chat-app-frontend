import React from "react";
import "./index.css";

export default class ProfileAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = "profile-avatar-div";

        if(this.props.className && typeof(this.props.className) === 'string') {
            className += (" " + this.props.className);
        }

        return (
        <div className={className}>
            {this.props.value}
        </div>
        )
    }
}