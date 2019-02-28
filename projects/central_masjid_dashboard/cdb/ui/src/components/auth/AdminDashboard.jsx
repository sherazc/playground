import React, {Component} from "react";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../../store/lib/utils";
import ContainerGridLayout01 from "../layout/ContainerGridLayout01";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AdminDashboard extends Component {
    render() {
        const value = 2;
        return (
            <ContainerGridLayout01>
                <div>
                    <AppBar position="static" style={{width: "50%"}}>
                        <Tabs value={value}>
                            <Tab label="Item One"/>
                            <Tab label="Item Two"/>
                            <Tab label="Item Three"/>
                        </Tabs>
                    </AppBar>
                </div>
            </ContainerGridLayout01>

        );
    }
}

export default connect(mapStateLoginToProps)(AdminDashboard);
