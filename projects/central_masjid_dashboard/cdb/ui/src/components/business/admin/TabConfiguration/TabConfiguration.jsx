import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import Configuration from "./Configuration/Configuration";
import Funds from "./Funds/Funds";
import {
    setCentralControl, setCentralControlEdit
} from "../../../../store/admin/adminActions";
import Expenses from "./Expenses/Expenses";


const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class TabConfiguration extends Component {

    constructor(props) {
        super(props);
        this.state = {centralControl: this.props.centralControl}
    }

    componentDidMount() {
        if (this.isValidCentralControl(this.props.centralControl)
            && !this.isValidCentralControl(this.state.centralControl)) {
            this.setCentralControlInState(this.props.centralControl);
        }

        if (!this.isValidCentralControl(this.props.centralControl)) {
            this.apiGetCentralControl();
        }
    }

    apiGetCentralControl() {
        const companyUrl = this.props.login.company.url;
        axios.get(`${baseUrl}/api/companies/url/${companyUrl}/central-control`)
            .then(response => {
                this.setCentralControlInState(response.data);
                this.props.setCentralControl(response.data);
            });
    }

    isValidCentralControl(centralControl) {
        return centralControl && centralControl.companyId;
    }

    onCancel() {
        this.apiGetCentralControl();
    }

    onSave() {
        axios.put(`${baseUrl}/api/companies/central-control`, this.state.centralControl)
            .then(response => {
                const serviceResponse = response.data;
                if(serviceResponse.target) {
                    const centralControl = this.state.centralControl;
                    centralControl.id = serviceResponse.target;
                    this.setCentralControlInState(centralControl);
                    this.props.setCentralControl(centralControl);
                }
            });
    }


    setCentralControlInState(centralControl) {
        this.setState({centralControl: centralControl});
    }

    render() {
        return (
            <div>
                <Configuration
                    defaultExpanded
                    customConfigurations={this.state.centralControl.customConfigurations}
                    onCancel={this.onCancel.bind(this)}
                    onSave={this.onSave.bind(this)}/>

                <Funds
                    defaultExpanded
                    funds={this.state.centralControl.funds}
                    onCancel={this.onCancel.bind(this)}
                    onSave={this.onSave.bind(this)}/>

                <Expenses
                    defaultExpanded
                    expenses={this.state.centralControl.expenses}
                    onCancel={this.onCancel.bind(this)}
                    onSave={this.onSave.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        centralControl: state.admin.centralControl,
        login: state.login
    }
};

const actions = {setCentralControl, setCentralControlEdit};

export default connect(mapStateToProps, actions)(TabConfiguration);


/*
Create salah time new input fields

Convert InputField to material ui TextField

✅ Create Slider for TabConfiguration's sub components

✅ TabConfiguration.state will hold centralControl

✅ TabConfiguration.onComponentWillMount
✅   - if redux.admin.centralControl dont exits
✅       - call API url/{url}/central-control
✅       - set API response in redux.admin.centralControl
✅       - call TabConfiguration.setCentralControlInState

❌   - if redux.admin.centralControlEdit exits
❌       - call TabConfiguration.setCentralControlInState
❌       - TabConfiguration.state.dirty = true

✅    - if redux.admin.centralControl exits and not exist TabConfiguration.state.centralControl
✅        - call TabConfiguration.setCentralControlInState(redux.admin.centralControl)
❌        - TabConfiguration.state.dirty = false

❌ TabConfiguration.componentWillUnmount
❌    - if TabConfiguration.state.dirty = true
❌        - set TabConfiguration.state.centralControl in redux.admin.centralControlEdit


TabConfiguration.setCentralControlInState set CentralControl parts in state
    - configurations
    - funds
    - expenses
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