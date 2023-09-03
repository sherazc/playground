import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Header01 from "../Header01/Header01";
import Footer01 from "../Footer01/Footer01";

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

class Layout01 extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div style={{backgroundColor: "#eee"}}>
                <Grid container justifyContent="center">
                    <Grid
                        container
                        className={classes.container}
                        alignItems="center"
                        justifyContent="flex-start">
                        <div style={{width: "100%"}}>
                            <Header01/>
                            <div style={{padding: "25px"}}>
                                {this.props.children}
                            </div>
                            <Footer01/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Layout01);