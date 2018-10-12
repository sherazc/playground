import React, {Component} from "react";
import {connect} from "react-redux";
import {userCreateAction} from "../store/action/user-actions";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            age: undefined
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            age: this.state.age
        };

        this.props.createUser(newUser);
        this.setState({
            name: "",
            age: ""
        });
    }

    render() {
        return (
            <div>
                <h1>Add users</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name: </label>
                        <br/>
                        <input
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                    </div>
                    <br/>
                    <div>
                        <label>Age: </label>
                        <br/>
                        <input
                            type="number"
                            name="age"
                            onChange={this.onChange}
                            value={this.state.age}
                        />
                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const actions = {
    createUser: userCreateAction
};


const mapStateToProps = state => {
    return {
        users: state.userReducer.user
    };
};

export default connect(mapStateToProps, actions)(AddUser);
