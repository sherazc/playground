import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

@inject("userProfileStore")
@observer
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.userProfileStore = this.props.userProfileStore;

        this.state = {
            nameInput: this.userProfileStore.user.name
        };
    }

    changeName(event) {
        this.props.userProfileStore.user.name = event.target.value;
        this.setState({
            nameInput: event.target.value
        });
    }

    render() {
        const {userProfileStore} = this.props;
        return (
            <div className="section">
                <b>User</b>
                <br/>
                <input
                    type="text"
                    value={this.userProfileStore.user.name}
                    onChange={this.changeName.bind(this)}/>
                <br/>
                Name: {userProfileStore.user.name}
                <br/>
                Age: {userProfileStore.user.age}
            </div>
        );
    }
}