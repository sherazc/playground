import React, {Component} from "react";
import {getPathParamFromProps} from "../../services/utilities";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => {
    const main = {height: 300, textAlign: "center", color: "white"};
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
        width: 115, height: 150,
        backgroundColor: "#ddb167",
        position: "relative",
        top: 10,
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
    }

    render() {
        const {classes} = this.props;
        const xsBreakPoint = 12;
        const smBreakPoint = 12;
        const mdBreakPoint = 4;

        return (
            <Grid container justify="center">
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
