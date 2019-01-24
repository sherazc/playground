import React, {Component} from "react";
import {getPathParamFromProps} from "../../services/utilities";


class CompanyDashboard extends Component {

    state = {
        companyDashboardUrl: ""
    };

    componentWillMount() {
        this.setState({
            companyDashboardUrl: getPathParamFromProps(this.props, "companyDashboardUrl")
        });
    }

    render() {
        return(
            <div>
                <h3>Company Dashboard</h3>
                <div>
                    This is company dashboard. {this.state.companyDashboardUrl}
                </div>
            </div>
        );
    }
}

export default CompanyDashboard;
