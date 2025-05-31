import React, { Component } from 'react';
import {inject, observer} from "mobx-react";

@inject("todoStore")
@inject("userProfileStore")
@observer
export default class Home extends Component {
    render() {
        const {userProfileStore, todoStore} = this.props;
        return (
            <div>
                <div className="section">
                    <b>User</b>
                    <br/>
                    Name: {userProfileStore.user.name}
                    <br/>
                    Age: {userProfileStore.user.age}
                </div>

                <div className="section">
                    <b>TODO</b>
                    <ul>
                        {todoStore.allTodo.map((td, i)=> {
                            return (
                                <li key={i}>{td}</li>
                            );
                        })}
                    </ul>
                </div>

            </div>
        );
    }
}