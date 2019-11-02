import React, {Component} from "react";
import {getConfigValue, getReactRouterPathParamFromUrl} from "../../../services/utilities";
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import axios from "axios";
import SalahTime from "./SalahTime/SalahTime";
import Accounts from "./Accounts/Accounts";
import Updates from "./Updates/Updates";
import AnalogClock from "./AnalogClock/AnalogClock";
import DigitalClock from "./DigitalClock";
import styles from "./CompanyDashboard.module.scss";
import {Link} from "react-router-dom";
import {
    apiGetCompanyConfigurations
} from "../../../store/common/configurations/configurationsAction"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class CompanyDashboard extends Component {
    state = {
        companyDashboardUrl: "",
        centralControl: {},
        companyConfigurations: []
    };

    componentDidMount() {
        // I am able to do this because react router props are set before
        // before component mount.
        const companyDashboardUrl = getReactRouterPathParamFromUrl(this.props, "companyDashboardUrl");
        if (!this.state.centralControl.id && companyDashboardUrl) {
            axios
                .get(`${baseUrl}/api/companies/url/${companyDashboardUrl}/central-control`)
                .then(response => {
                    this.setState({
                        centralControl: response.data
                    });
                    this.loadCompanyConfigurations(response.data.companyId);
                });
        }
    }

    loadCompanyConfigurations(companyId) {
        if (this.state.companyConfigurations.length < 1) {
            if (this.props.companyConfigurations.length > 0) {
                this.setConfigurationInState(this.props.companyConfigurations)
            } else {
                this.props.apiGetCompanyConfigurations(companyId, this.setConfigurationInState.bind(this));
            }
        }
    }

    setConfigurationInState(companyConfigurations) {
        this.setState({companyConfigurations});
    }

    render() {
        const xsBreakPoint = 12;
        const smBreakPoint = 12;
        const mdBreakPoint = 4;
        let clockType = getConfigValue("clock_type", this.state.companyConfigurations, "1");

        return (
            <Grid container justify="center"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/dashboard_background.jpg)`}}
                className={styles.gridContainer}>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.gridSide}>
                    {clockType === "1" &&
                    <AnalogClock sizeLg="8" sizeMd="15" marginLg="2" marginMd="2"/>}
                    {clockType === "2" &&
                    <DigitalClock sizeLg="15" sizeMd="25" marginLg="2" marginMd="2"/>}

                    {/* Remove these links. These are just for testing */}
                    <div style={{position: "absolute", color: "white"}}>
                        <Link to="/" style={{color: "white"}}>home</Link>
                    </div>

                    <div className={styles.companyName}>
                        Hamzah Islamic Center
                    </div>

                    <div className={styles.sideBoxLeft}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`}}>
                        <SalahTime
                            centralControl={this.state.centralControl}
                            companyConfigurations={this.state.companyConfigurations}/>
                    </div>
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.gridCenter}>
                    <div className={styles.centerBox}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/center_box_background.svg)`}}>
                        <Accounts centralControl={this.state.centralControl}/>
                    </div>
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.gridSide}>
                    <div className={styles.sideBox}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`}}>
                        <Updates/>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        companyConfigurations: state.common.configurations.companyConfigurations
    };
};

const actions = {apiGetCompanyConfigurations};

export default connect(mapStateToProps, actions)(CompanyDashboard);
