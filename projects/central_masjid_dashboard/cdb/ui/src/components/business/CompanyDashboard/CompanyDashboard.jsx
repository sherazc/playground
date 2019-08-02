import React, {Component} from "react";
import {getPathParamFromProps} from "../../../services/utilities";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from "axios";

import SalahTime from "./SalahTime/SalahTime";
import Accounts from "./Accounts";
import Updates from "./Updates/Updates";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";
import styles from "./CompanyDashboard.module.scss";
import {Link} from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

const sideBoxBackgroundRatio = 1.17;
const sideBoxPaddingRatio = .095;

// deprecated
const centerBoxBackgroundRatio = 1.40;
const centerBoxPaddingRatio = .08;

const stylesDep = theme => {
    const main = {
        paddingBottom: 20
    };

    const mainCenter = {
        ...main, backgroundColor: "#a5d082",
    };

    const mainLeftSide = {
        ...main, backgroundColor: "#a7d9d3",
    };

    const mainRightSide = {
        ...main, backgroundColor: "#e5afd3",
    };

    const boxBackground = {
        textAlign: "center",
        color: "black",
        margin: "0 auto",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: 0,
        overflow: "hidden",
        position: "relative",
        width: "90%",
    };

    // deprecated
    const centerBoxBackground = {
        ...boxBackground,
        backgroundColor: "#ace7d9",
        // backgroundImage: `url(${process.env.PUBLIC_URL}/images/center_box_background.svg)`,
        paddingTop: `calc(${centerBoxBackgroundRatio} * 100%)`,
        marginTop: "5%",
    };

    const sideBoxBackground = {
        ...boxBackground,
        backgroundColor: "#ddb167",
        //paddingTop: `calc(${sideBoxBackgroundRatio} * 100%)`,
        paddingTop: 500,
        marginTop: 20,
        [theme.breakpoints.up("md")]: {
            // marginTop: "30%",
            backgroundColor: "#8167dd"
        }
    };

    const boxPadding = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        // height: "100%",
    };

    const sideBoxPadding = {
        ...boxPadding,
        padding: `calc(${sideBoxPaddingRatio} * 100%)`
    };

    const centerBoxPadding = {
        ...boxPadding,
        padding: `calc(${centerBoxPaddingRatio} * 100%)`,

    };

    const sideBoxContent = {
        backgroundColor: "rgba(0,255,0,0.3)", height: "100%"
    };

    const centerBoxContent = {
        backgroundColor: "rgba(255,0,0,0.3)",
        height: "100%"
    };

    return ({
        mainCenter, mainLeftSide, mainRightSide,
        centerBoxBackground, centerBoxPadding, centerBoxContent,
        sideBoxBackground, sideBoxPadding, sideBoxContent,
    })
};


class CompanyDashboard extends Component {

    state = {
        companyDashboardUrl: "",
        centralControl: {}
    };

    componentWillMount() {
        this.setState({
            companyDashboardUrl: getPathParamFromProps(this.props, "companyDashboardUrl")
        });

        document.getElementsByTagName("html")[0].style.height = "100%";
        document.getElementsByTagName("body")[0].style.height = "100%";
        document.getElementById("root").style.height = "100%";
    }

    componentDidMount() {
        this.updateCentralControl();
    }

    updateCentralControl() {
        axios
            .get(`${baseUrl}/api/companies/url/${this.state.companyDashboardUrl}/central-control`)
            .then(response => this.setState({
                    centralControl: response.data
                })
            );
    }

    componentWillUnmount() {
        document.getElementsByTagName("html")[0].style.height = "auto";
        document.getElementsByTagName("body")[0].style.height = "auto";
        document.getElementById("root").style.height = "auto";
    }

    render() {
        const {classes} = this.props;
        const xsBreakPoint = 12;
        const smBreakPoint = 12;
        const mdBreakPoint = 4;
        console.log(styles.sideBoxBackground);
        return (
            <Grid container justify="center" style={{height: "100%",}}>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.mainLeftSide}>
                    {this.props.match.params.companyDashboardUrl === "c1" &&
                    <AnalogClock sizeLg="10" sizeMd="20" marginLg="2" marginMd="2"/>}
                    {this.props.match.params.companyDashboardUrl === "c2" &&
                    <DigitalClock sizeLg="15" sizeMd="25" marginLg="2" marginMd="2"/>}

                    <div style={{position: "absolute"}}>
                        <Link to="/" className={styles.main}>home</Link>
                        <Link to="/c1">c1</Link>
                        <Link to="/c2">c2</Link>
                    </div>

                    <div
                        // className={classes.sideBoxBackground}
                        // className={styles.sideBoxBackground}
                        className={styles.sideBox}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`}}>
                        <SalahTime/>


                    </div>

                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.mainCenter}>
                    <div className={styles.centerBoxBackground}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/center_box_background.svg)`}}>
                        <div className={classes.centerBoxPadding}>
                            <div className={classes.centerBoxContent}>
                                <Accounts centralControl={this.state.centralControl}/>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={styles.mainRightSide}>
                    <div className={classes.sideBoxBackground}
                        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`}}>
                        <div className={classes.sideBoxPadding}>
                            <div className={classes.sideBoxContent}>
                                <Updates/>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(stylesDep)(CompanyDashboard);
