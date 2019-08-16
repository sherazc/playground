import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import AdminNavigation from "../common/navigation/AdminNavigation";

const styles = theme => {
    return ({
        root: {
            flexGrow: 1,
        },
        container: {
            background: "#fff",
            [theme.breakpoints.up("lg")]: {
                width: 1170
            }
        },

    });
};

class ContainerGridLayout01 extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid
                    container
                    className={classes.container}
                    alignItems="center"
                    justify="flex-start">
                    <div style={{width: "100%"}}>
                        <div style={{backgroundColor: "#c3ecba", padding: "20px",}}>
                            Header
                        </div>
                        {this.props.children}
                        <div style={{backgroundColor: "#d6d6d6", padding: "20px", color: "black"}}>
                            Footer
                            <AdminNavigation/>
                        </div>
                    </div>
                </Grid>

            </Grid>
        );
    }


}


export default withStyles(styles)(ContainerGridLayout01);