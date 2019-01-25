import React, {Component} from "react";
import {getPathParamFromProps} from "../../services/utilities";
import Button from '@material-ui/core/Button';

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

                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>

                </div>
            </div>
        );
    }
}

export default CompanyDashboard;
