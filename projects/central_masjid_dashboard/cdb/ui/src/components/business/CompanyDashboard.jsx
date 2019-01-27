import React, {Component} from "react";
import {getPathParamFromProps} from "../../services/utilities";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import ContainerGridLayout from "../layout/ContainerGridLayout";


const styles = theme => ({});


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
        return (
            <ContainerGridLayout>
                <Grid item>
                    <h3>Company Dashboard</h3>
                    <div>

                        This is company dashboard. {this.state.companyDashboardUrl}

                        <Button variant="contained" color="primary">
                            Hello World
                        </Button>

                    </div>
                </Grid>
            </ContainerGridLayout>
        );
    }
}

export default withStyles(styles)(CompanyDashboard);
