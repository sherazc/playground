import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Layout01 from "../../layout/Layout01/Layout01";
import TabPrayer from "./TabPrayer/TabPrayer";
import TabConfiguration from "./TabConfiguration/TabConfiguration";
import TabWidget from "./TabWidget/TabWidget";

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
            <Layout01>
                <div>
                    <AppBar position="static">
                        <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
                            <Tab label="Configuration"/>
                            <Tab label="Salah"/>
                            <Tab label="Widgets" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabIndex === 0 && <TabConfiguration/>}
                    {this.state.tabIndex === 1 && <TabPrayer/>}
                    {this.state.tabIndex === 2 && <TabWidget/>}
                </div>
            </Layout01>
        );
    }
}

export default AdminControl;
