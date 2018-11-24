import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "./partials/InputField";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("Submitting");
    }

    createInitialState() {
        return {
            companyId: "",
            email: "",
            password: ""
        }

    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        label="Email"
                        name="email"
                        required={true}/>
                    <InputField
                        label="Password"
                        name="password"
                        required={true}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}


export default connect(null, null)(Login);
