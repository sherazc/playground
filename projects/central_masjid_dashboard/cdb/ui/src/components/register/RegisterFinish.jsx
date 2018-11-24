import React, {Component} from "react";
// import {Redirect} from "react-router";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {canNotBeOnRegisterFinish} from "../../services/register/RegisterServices";

class RegisterFinish extends Component {
    render() {
        const finishRegister = this.props.finishRegister;
        if (canNotBeOnRegisterFinish(finishRegister)) {
            return <Redirect to="/register/user"/>;
        }
        return (
            <div>
                Successfully register <b>{finishRegister.companyName}</b>
                and added <b>{finishRegister.email}</b> as it's admin user.
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        finishRegister: state.registerCompany.finishRegister
    };
};


export default connect(mapStateToProps)(RegisterFinish);