import React, {Component} from "react";
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContainerGridLayout01 from "../../layout/ContainerGridLayout01";
import {mapStateLoginToProps} from "../../../store/lib/utils";
import TabPrayer from "./TabPrayer/TabPrayer";
import TabConfiguration from "./TabConfiguration";
import TabAccounting from "./TabAccounting";

class AdminControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, value){
        this.setState({ tabIndex: value });
    };

    render() {
        return (
            <ContainerGridLayout01>
                <div>
                    <AppBar position="static">
                        <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
                            <Tab label="Salah"/>
                            <Tab label="Configuration"/>
                            <Tab label="Accounting"/>
                        </Tabs>
                    </AppBar>
                    {this.state.tabIndex === 0 && <TabPrayer/>}
                    {this.state.tabIndex === 1 && <TabConfiguration/>}
                    {this.state.tabIndex === 2 && <TabAccounting/>}
                </div>
            </ContainerGridLayout01>
        );
    }
}

export default connect(mapStateLoginToProps)(AdminControl);
