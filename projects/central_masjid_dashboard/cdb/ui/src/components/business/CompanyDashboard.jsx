import React, {Component} from "react";
import {getPathParamFromProps} from "../../services/utilities";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    const main = {height: "100%", textAlign: "center", color: "white"};
    const mainCenter = {...main,
        backgroundColor: "#c7e7b5",
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/center_box.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
    };
    const mainSide = {
        ...main
    };

    const sideBox = {
        width: 350, height: 550,
        backgroundColor: "#ddb167",
        position: "relative",
        top: 100,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/side_box.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
    };

    return ({
        mainSide, mainCenter, sideBox,
        mainLeftSide: {...mainSide, backgroundColor: "#a7d9d3"},
        mainRightSide: {...mainSide, backgroundColor: "#e5afd3"}
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
            <Grid container justify="center" style={{height: "100%"}}>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainLeftSide}>
                    <div className={classes.sideBox}>
                    Left side
                    </div>
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainCenter}>
                    Center
                </Grid>
                <Grid item xs={xsBreakPoint} sm={smBreakPoint} md={mdBreakPoint} className={classes.mainRightSide}>
                    <div className={classes.sideBox}>
                        Right side
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CompanyDashboard);
