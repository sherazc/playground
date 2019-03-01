import React, {Component} from "react";
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContainerGridLayout01 from "../../layout/ContainerGridLayout01";
import {mapStateLoginToProps} from "../../../store/lib/utils";
import SalahTab from "./SalahTab";
import ConfigurationTab from "./ConfigurationTab";

class AdminControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1
        };
    }

    render() {
        return (
            <ContainerGridLayout01>
                <div>
                    <AppBar position="static">
                        <Tabs value={this.state.tabIndex}>
                            <Tab label="Salah"/>
                            <Tab label="Configuration"/>
                            <Tab label="Accounting"/>
                        </Tabs>
                    </AppBar>
                    {this.state.tabIndex === 0 && <SalahTab/>}
                    {this.state.tabIndex === 1 && <ConfigurationTab/>}

                </div>
            </ContainerGridLayout01>

        );
    }
}

export default connect(mapStateLoginToProps)(AdminControl);
