import React, {Component} from 'react';
import {alpha, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {withRouter} from 'react-router-dom';
import Logo from "../../Home/Logo";
import Drawer01 from "./Drawer01";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../store/login/loginActions";
import {isAuthPresent, isSuperAdminLogin} from "../../../services/auth/AuthNZ";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    // this is to show or hide app bar title
    title: {
        display: 'block',
        /*
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        */
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

const baseLinkUrl = process.env.PUBLIC_URL;

class Header01 extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitialState();
    }

    createInitialState() {
        return {
            drawerOpen: false,
        }
    }

    onOpenDrawer() {
        this.setState({drawerOpen: true});
    }

    onCloseDrawer() {
        this.setState({drawerOpen: false});
    }

    onLogout(event) {
        event.preventDefault();
        this.props.loginResetAction();
        this.props.history.replace(`${process.env.PUBLIC_URL}/`);
    }

    onViewMyProfile(event) {
        event.preventDefault();
        this.props.viewMyProfileAction(this.props.login.user);
        this.props.history.replace(`${process.env.PUBLIC_URL}/auth/company/user/profile`);
    }


    render() {
        const classes = this.props.classes;
        const isLogin = isAuthPresent(this.props.login);
        const superAdminLogin = isSuperAdminLogin(this.props.login);

        return (
            <div className={classes.grow}>
                <Drawer01 drawerOpen={this.state.drawerOpen} onCloseDrawer={this.onCloseDrawer.bind(this)}/>
                <AppBar position="static">
                    <Toolbar>
                        {isLogin && (
                            <div
                                className={classes.sectionMobile}>
                                <IconButton
                                    onClick={this.onOpenDrawer.bind(this)}
                                    edge="start"
                                    className={""}
                                    color="inherit"
                                    aria-label="open drawer">
                                    <MenuIcon/>
                                </IconButton>
                            </div>
                        )}
                        <Logo style={{
                            fill: "rgba(255,255,255,0.95)",
                            width: "30px", marginRight: "10px",
                            cursor: "pointer"
                        }} onClick={() => this.props.history.replace(`${process.env.PUBLIC_URL}/`)}/>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Masjid Dashboard
                        </Typography>
                        <div className={classes.grow}/>
                        {isLogin && (
                            <div className={classes.sectionDesktop}>

                                <Button
                                    color="inherit"
                                    startIcon={<Icon>business</Icon>}
                                    onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/view`)}>
                                    Masjid
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<Icon>settings</Icon>}
                                    onClick={() => this.props.history.push(`${baseLinkUrl}/auth/admin`)}>
                                    Settings
                                </Button>
                                <Button
                                    color="inherit"
                                    startIcon={<Icon>group</Icon>}
                                    onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/user/list/current`)}>
                                    Users
                                </Button>
                                {superAdminLogin && (
                                    <>
                                        <Button
                                            color="inherit"
                                            startIcon={<Icon>account_balance</Icon>}
                                            onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/list`)}>
                                            All Masjids
                                        </Button>

                                        <Button
                                            color="inherit"
                                            startIcon={<Icon>supervised_user_circle</Icon>}
                                            onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/user/list/all`)}>
                                            All Users
                                        </Button>
                                        <IconButton
                                            onClick={() => this.props.history.push(`${baseLinkUrl}/examples`)}
                                            color="inherit">
                                            <Icon>bug_report</Icon>
                                        </IconButton>
                                    </>
                                )}
                                <IconButton
                                    onClick={this.onViewMyProfile.bind(this)}
                                    color="inherit">
                                    <Icon>person</Icon>
                                </IconButton>

                                <IconButton
                                    onClick={this.onLogout.bind(this)}
                                    color="inherit">
                                    <Icon>exit_to_app</Icon>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default connect(mapStateLoginToProps, {
    loginResetAction,
    viewMyProfileAction
})(withRouter(withStyles(styles)(Header01)));