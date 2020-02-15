import React, {Component} from "react";
import {connect} from "react-redux";
import {loginAction, loginResetAction} from "../../../store/login/loginActions";
import {verifyAuthentication} from "../../../services/auth/AuthNZ";
import {Redirect} from "react-router";
import {mapStateLoginToProps} from "../../../store/lib/utils";

import {
    TextField, InputLabel, MenuItem, FormControl, Select, Button, Link
} from '@material-ui/core';

import styles from "./Login.module.scss";
import {getQueryParam} from "../../../services/utilities";

const baseLinkUrl = process.env.PUBLIC_URL;
const ADMIN_LOGIN_PARAM_NAME = "admin";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectCompany = this.onSelectCompany.bind(this);
        this.adminLogin = getQueryParam(ADMIN_LOGIN_PARAM_NAME);
    }

    createInitialState() {
        return {
            companyId: "",
            // email: "super.admin.user@email.com",
            email: "",
            // email: "stariqch@yahoo.com",
            // password: "password",
            password: "",
            loginSuccessful: ""
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const loginRequest = {
            companyId: this.state.companyId,
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginAction(loginRequest);
    }

    onSelectCompany(event) {
        this.setState({
            companyId: event.target.value
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.login.successful !== this.state.loginSuccessful) {
            this.setState({loginSuccessful: this.props.login.successful});
        }
    }


    loginFailedMessage() {
        if (this.state.loginSuccessful === false) {
            return (
                <div style={{color: "#CC3E29"}}>
                    Login failed. Invalid email or password.
                </div>
            );
        }
    }

    render() {
        if (verifyAuthentication(this.props.login.tokenPayload, true)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/admin`}/>
        }
        const {companies} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.heading3}>
                    Sign In
                </div>
                {this.props.login.token}
                {this.loginFailedMessage()}
                <form onSubmit={this.onSubmit}>
                    {this.adminLogin &&
                    <FormControl
                        className={styles.vMargin3}
                        style={{display: "block"}}>
                        <InputLabel htmlFor="companySelect">
                            Masjid
                        </InputLabel>
                        <Select
                            style={{width: "250px"}}
                            value={this.state.companyId}
                            onChange={this.onSelectCompany}
                            required={true}
                            inputProps={{
                                name: 'companyId',
                                id: 'companyId'
                            }}>
                            {companies.map((company, index) => {
                                return (
                                    <MenuItem
                                        key={index} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    }
                    <TextField
                        style={{display: "block"}}
                        className={styles.vMargin3}
                        inputProps={{className: styles.inputControl}}
                        name="email"
                        label="Email"
                        required={true}
                        value={this.state.email}
                        onChange={this.onChange}/>

                    <TextField
                        style={{display: "block"}}
                        className={styles.vMargin3}
                        inputProps={{className: styles.inputControl}}
                        label="Password"
                        name="password"
                        required={true}
                        onChange={this.onChange}
                        value={this.state.password}
                        type="password"
                        autoComplete="current-password"/>
                    <Button
                        style={{display:"block", width: "250px"}}
                        className={styles.vMargin3}
                        type="submit" variant="outlined" color="primary">
                        Submit
                    </Button>
                </form>

                <Link className={styles.vMargin3} href={`${baseLinkUrl}/auth/company/create`}>
                    Register your masjid now!
                </Link>
            </div>
        );
    }
}

const actions = {loginAction, loginResetAction};

export default connect(mapStateLoginToProps, actions)(Login);
