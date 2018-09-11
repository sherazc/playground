import React, { Component } from 'react';
import {inject} from "mobx-react";
import SubUserProfile from "./SubUserProfile";

@inject("userProfileStore")
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.userProfileStore = this.props.userProfileStore;

        this.state = {
            nameInput: this.userProfileStore.user.name
        };
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
                    onChange={e => {
                        // console.log(e.target.value);
                        // this.userProfileStore.user.name = e.target.value;
                        this.userProfileStore.user.name = e.target.value;
                        this.setState({
                            nameInput: e.target.value
                        });

                        //this.userProfileStore.updateName(e.target.value);
                        // this.userProfileStore.updateName(this.state.nameInput);

                    }}
                />

                <button onClick={e => {

                    this.userProfileStore.user.name = 'Chaudhry';
                }}>Click me</button>

                <br/>
                Name: {userProfileStore.user.name}
                <br/>
                Age: {userProfileStore.user.age}
                <SubUserProfile/>
            </div>
        );
    }
}