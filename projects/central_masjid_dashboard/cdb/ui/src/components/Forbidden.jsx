import React from "react";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../store/lib/utils";
import Layout01 from "./layout/Layout01/Layout01";

const Forbidden = (props) => {
    let message = 'You are not allowed to access this page.';
    if (props.login.user.firstName) {
        message = `${props.login.user.firstName} ${props.login.user.lastName} is not allowed to access this resources.`;
    }

    return (
        <Layout01>
            <div>
                <h1>Forbidden - 403</h1>
                <div>
                    {message}
                </div>
            </div>
        </Layout01>
    );
};

export default connect(mapStateLoginToProps)(Forbidden);
