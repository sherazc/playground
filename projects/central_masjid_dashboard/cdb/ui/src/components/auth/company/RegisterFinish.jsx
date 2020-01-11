import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {canNotBeOnRegisterFinish} from "../../../services/register/RegisterServices";
import Layout01 from "../../layout/Layout01/Layout01";

class RegisterFinish extends Component {
    render() {
        const finishRegister = this.props.finishRegister;
        if (canNotBeOnRegisterFinish(finishRegister)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/company/create`}/>;
        }
        return (
            <Layout01>
            <div>
                <h3>Registration complete.</h3>
                <p>
                    Successfully register <b>{finishRegister.companyName}</b>
                    , and added <b>{finishRegister.email}</b> as it's admin user.

                </p>
                <p>
                    A verification email is sent to you. Please click the confirm link in it.
                </p>
            </div>
            </Layout01>
        );
    }
}

const mapStateToProps = state => {
    return {
        finishRegister: state.registerCompany.finishRegister
    };
};


export default connect(mapStateToProps)(RegisterFinish);