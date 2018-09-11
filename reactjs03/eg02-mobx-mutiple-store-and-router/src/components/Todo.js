import React, { Component } from 'react';
import {inject} from 'mobx-react';

@inject("todoStore")
export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.todoStore = this.props.todoStore;
        this.state = {
            todoInput:""
        };
    }

    addTodo(event) {
        event.preventDefault();
        this.todoStore.allTodo.push(this.state.todoInput);
        this.setState({todoInput: ""})
    }

    render() {
        return (
            <div className="section">
                <div>
                    <form onSubmit={this.addTodo.bind(this)}>
                        <input type="text"
                               value={this.state.todoInput}
                               onChange={(e) => this.setState({todoInput: e.target.value})}/>
                        <button type="submit">Add</button>
                    </form>
                </div>
                <b>TODO</b>
                <ul>
                    {this.todoStore.allTodo.map((td, i)=> {
                        return (
                            <li key={i}>{td}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}