import React, {Component} from "react";
import {getReactRouterPathParamFromUrl} from "../../../services/utilities";
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import SalahTime from "./SalahTime/SalahTime";
import Accounts from "./Accounts/Accounts";
import Updates from "./Updates/Updates";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";
import styles from "./CompanyDashboard.module.scss";
import {Link} from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class CompanyDashboard extends Component {
    state = {
        companyDashboardUrl: "",
        centralControl: {}
    };

    componentDidMount() {
        // I am able to do this because react router props are set before
        // before component mount.
        const companyDashboardUrl = getReactRouterPathParamFromUrl(this.props, "companyDashboardUrl");
        if (!this.state.centralControl.id && companyDashboardUrl) {
            axios
                .get(`${baseUrl}/api/companies/url/${companyDashboardUrl}/central-control`)
                .then(response => this.setState({
                        centralControl: response.data
                    })
                );
            document.getElementsByTagName("html")[0].style.height = "100%";
            document.getElementsByTagName("body")[0].style.height = "100%";
            document.getElementById("root").style.height = "100%";
        }
    }

    componentWillUnmount() {
        document.getElementsByTagName("html")[0].style.height = "auto";
        document.getElementsByTagName("body")[0].style.height = "auto";
        document.getElementById("root").style.height = "auto";
    }

    render() {
        const xsBreakPoint = 12;
        const smBreakPoint = 12;
        const mdBreakPoint = 4;
        return (
            <Grid container justify="center"
                style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/dashboard_background.jpg)`}}
                className={styles.gridContainer}>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.gridSide}>
                    {this.props.match.params.companyDashboardUrl === "c1" &&
                    <AnalogClock sizeLg="8" sizeMd="20" marginLg="2" marginMd="2"/>}
                    {this.props.match.params.companyDashboardUrl === "c2" &&
                    <DigitalClock sizeLg="15" sizeMd="25" marginLg="2" marginMd="2"/>}

                    {/* Remove these links. These are just for testing */}
                    <div style={{position: "absolute"}}>
                        <Link to="/" className={styles.main}>home</Link>
                        <Link to="/c1">c1</Link>
                        <Link to="/c2">c2</Link>
                    </div>

                    <div className={styles.sideBox}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`}}>
                        <SalahTime centralControl={this.state.centralControl}/>
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

export default CompanyDashboard;


/*


Build configurations in redux.common
create helper method to load configuration from centralControl or picklist
load Jummah configuration


pull Salah time
fix hijri and gregorian dates
Fix salah time UI
✅ Fix react life cycle warning
✅ Fix Expenses animation
✅ Style Expenses UI

Remove all getDerivedStateFromProps and use componentDidUpdate
to update state after props are set updated by parent

*/
