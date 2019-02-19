import React, {Component} from "react";
import {getPathParamFromProps} from "../../../services/utilities";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import SalahTime from "./SalahTime";
import Funds from "./Funds";
import Updates from "./Updates";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";


const sideBoxBackgroundRatio = 1.17;
const sideBoxPaddingRatio = .095;

const centerBoxBackgroundRatio = 1.40;
const centerBoxPaddingRatio = .08;

const styles = theme => {
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

    const centerBoxBackground = {
        ...boxBackground,
        backgroundColor: "#ace7d9",
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/center_box_background.svg)`,
        paddingTop: `calc(${centerBoxBackgroundRatio} * 100%)`,
        marginTop: "5%",
    };

    const sideBoxBackground = {
        ...boxBackground,
        backgroundColor: "#ddb167",
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box_background.svg)`,
        paddingTop: `calc(${sideBoxBackgroundRatio} * 100%)`,
        marginTop: 20,
        [theme.breakpoints.up("md")]: {
            marginTop: "30%",
        }
    };

    const boxPadding = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
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
        companyDashboardUrl: ""
    };

    componentWillMount() {
        this.setState({
            companyDashboardUrl: getPathParamFromProps(this.props, "companyDashboardUrl")
        });

        document.getElementsByTagName("html")[0].style.height = "100%";
        document.getElementsByTagName("body")[0].style.height = "100%";
        document.getElementById("root").style.height = "100%";
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

        return (
            <Grid container justify="center" style={{height: "100%", }}>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainLeftSide}>
                    {this.props.match.params.companyDashboardUrl === "c1"&& <AnalogClock sizeLg="20" sizeMd="25" marginLg="3" marginMd="3"/>}
                    {this.props.match.params.companyDashboardUrl === "c2"&& <DigitalClock sizeLg="20" sizeMd="25" marginLg="3" marginMd="3"/>}
                    <div className={classes.sideBoxBackground}>
                        <div className={classes.sideBoxPadding}>
                            <div className={classes.sideBoxContent}>
                                <SalahTime/>
                            </div>
                        </div>
                    </div>

                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainCenter}>
                    <div className={classes.centerBoxBackground}>
                        <div className={classes.centerBoxPadding}>
                            <div className={classes.centerBoxContent}>
                                <Funds/>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainRightSide}>
                    <div className={classes.sideBoxBackground}>
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

export default withStyles(styles)(CompanyDashboard);
