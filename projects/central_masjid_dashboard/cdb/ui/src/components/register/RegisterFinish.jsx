import React, {Component} from "react";
// import {Redirect} from "react-router";
import {connect} from "react-redux";

class RegisterFinish extends Component {
    render() {
        const finishRegister = this.props.finishRegister;
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