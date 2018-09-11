import React, { Component } from 'react';
import {inject} from 'mobx-react';

@inject("todoStore")
export default class Todo extends Component {
    render() {
        const {todoStore} = this.props;
        return (
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
        );
    }
}