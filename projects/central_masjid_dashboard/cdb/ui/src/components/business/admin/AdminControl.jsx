import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContainerGridLayout01 from "../../layout/ContainerGridLayout01";
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
                            <Tab label="Configuration"/>
                            <Tab label="Accounting"/>
                            <Tab label="Salah"/>
                        </Tabs>
                    </AppBar>
                    {this.state.tabIndex === 0 && <TabConfiguration/>}
                    {this.state.tabIndex === 1 && <TabAccounting/>}
                    {this.state.tabIndex === 2 && <TabPrayer/>}
                </div>
            </ContainerGridLayout01>
        );
    }
}

export default AdminControl;
