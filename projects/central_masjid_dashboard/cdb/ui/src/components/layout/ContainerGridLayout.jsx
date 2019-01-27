import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => {
    console.log(theme.breakpoints.up("lg"));
    return ({
        root: {
            flexGrow: 1,
        },
        demo: {
            background: "#f00",
            [theme.breakpoints.up("lg")]: {
                width: 1170
            }
        }
    });
};

class ContainerGridLayout extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center">
                <Grid
                    container
                    className={classes.demo}
                    alignItems="center"
                    justify="flex-start">
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }


}


export default withStyles(styles)(ContainerGridLayout);