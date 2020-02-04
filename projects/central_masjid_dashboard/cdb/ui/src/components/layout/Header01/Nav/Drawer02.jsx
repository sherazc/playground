import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import MailIcon from '@material-ui/icons/Mail';
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {loginResetAction, viewMyProfileAction} from "../../../../store/login/loginActions";

import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import {isSuperAdminLogin} from "../../../../services/auth/AuthNZ";

const baseLinkUrl = process.env.PUBLIC_URL;

class Drawer02 extends Component {
    constructor(props) {
        super(props);
        this.drawerContent = this.createDrawerContent(props);
    }

    createDrawerContent(props) {
        const superAdminLogin = isSuperAdminLogin(this.props.login);
        return (
            <div
                style={{width: 250}}
                role="presentation"
                onClick={props.onCloseDrawer}
                onKeyDown={props.onCloseDrawer}
            >
                <List>
                    <ListItem button
                              onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/user/list/current`)}>
                        <ListItemIcon><Icon>group</Icon></ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>


                    <ListItem button
                              onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/view`)}>
                        <ListItemIcon><Icon>business</Icon></ListItemIcon>
                        <ListItemText primary="Masjid"/>
                    </ListItem>

                    <ListItem button
                              onClick={() => this.props.history.push(`${baseLinkUrl}/auth/admin`)}>
                        <ListItemIcon><Icon>settings</Icon></ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItem>
                </List>

                {superAdminLogin && (
                    <>
                        <Divider/>
                        <List>
                            <ListItem button
                                      onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/list`)}>
                                <ListItemIcon><Icon>account_balance</Icon></ListItemIcon>
                                <ListItemText primary="All Companies"/>
                            </ListItem>


                            <ListItem button
                                      onClick={() => this.props.history.push(`${baseLinkUrl}/auth/company/user/list/all`)}>
                                <ListItemIcon><Icon>supervised_user_circle</Icon></ListItemIcon>
                                <ListItemText primary="All Users"/>
                            </ListItem>

                            <ListItem button
                                      onClick={() => this.props.history.push(`${baseLinkUrl}/examples`)}>
                                <ListItemIcon><Icon>bug_report</Icon></ListItemIcon>
                                <ListItemText primary="Debug"/>
                            </ListItem>
                        </List>
                    </>
                )}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.drawerOpen} onClose={this.props.onCloseDrawer}>
                    {this.drawerContent}
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateLoginToProps, {
    loginResetAction,
    viewMyProfileAction
})(withRouter(Drawer02));
