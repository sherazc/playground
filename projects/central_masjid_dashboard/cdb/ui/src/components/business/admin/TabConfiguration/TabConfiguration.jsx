import React, {Component} from "react";
import Configuration from "./Configuration/Configuration";

class TabConfiguration extends Component {

    constructor(props) {
        super(props);
        this.state = {centralControl: {}}
    }




    render() {
        return (
            <div>
                <Configuration defaultExpanded/>

            </div>
        );
    }
}

export default TabConfiguration;


/*
Create salah time new input fields

Convert InputField to material ui TextField

✅ Create Slider for TabConfiguration's sub components

TabConfiguration.state will hold centralControl

TabConfiguration.onComponentWillMount
    - if redux.admin.centralControl dont exits
        - call API url/{url}/central-control
        - set API response in redux.admin.centralControl
        - call TabConfiguration.setCentralControlInState

    - if redux.admin.centralControlEdit exits
        - call TabConfiguration.setCentralControlInState
        - TabConfiguration.state.dirty = true

    - if redux.admin.centralControl exits
        - call TabConfiguration.setCentralControlInState
        - TabConfiguration.state.dirty = false


TabConfiguration.componentWillUnmount
    - if TabConfiguration.state.dirty = true
        - set TabConfiguration.state.centralControl in redux.admin.centralControlEdit


TabConfiguration.setCentralControlInState set CentralControl parts in state
    - configurations
    - announcements
    - events
    - jummahs

TabConfiguration.onChange any value set TabConfiguration.state.dirty = true

TabConfiguration.render
    - if TabConfiguration.state.dirty = true show save/cancel bar
    - if TabConfiguration.state.CentralControl.announcements, show announcements component
    - if TabConfiguration.state.CentralControl.configurations, show configuration component
    - if TabConfiguration.state.CentralControl.events, show events component
    - if TabConfiguration.state.CentralControl.jummahs, show jummahs component
    - if TabConfiguration.state.CentralControl.funds, show jummahs component
    - if TabConfiguration.state.CentralControl.expenses, show jummahs component

TabConfiguration.onSave


 */