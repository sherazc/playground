import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

@inject("userProfileStore")
@observer
export default class UserProfile extends Component {

    render() {
        const {userProfileStore} = this.props;
        return (
            <div className="section">
                <b>User</b>
                <br/>
                <input
                    type="text"
                    value={userProfileStore.user.name}
                    onChange={e => this.props.userProfileStore.user.name = e.target.value}/>

                <br/>
                Name: {userProfileStore.user.name}
                <br/>
                Age: {userProfileStore.user.age}
            </div>
        );
    }
}