import React, { Component } from 'react';
import {inject} from "mobx-react";

@inject("userProfileStore")
export default class SubUserProfile extends Component {
    render() {
        const {userProfileStore} = this.props;
        return (
            <div className="section">
                <b>Sub User Profile</b>
                <br/>
                Name: {userProfileStore.user.name}
                <br/>
                Age: {userProfileStore.user.age}
            </div>
        );
    }
}