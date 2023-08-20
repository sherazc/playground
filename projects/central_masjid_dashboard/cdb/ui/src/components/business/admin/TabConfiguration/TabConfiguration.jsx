import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import Configuration from "./Configuration/Configuration";
import Funds from "./Funds/Funds";
import {
    setCentralControl, setCentralControlEdit
} from "../../../../store/admin/adminActions";
import Expenses from "./Expenses/Expenses";
import Jummah from "./Jummah/Jummah";
import {AdminExpenseSheet} from "./AdminExpenseSheet/AdminExpenseSheet";


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
                if (serviceResponse.target) {
                    const centralControl = this.state.centralControl;
                    centralControl.id = serviceResponse.target;
                    this.setCentralControlInState(centralControl);
                    this.props.setCentralControl(centralControl);
                }
            });
    }

    onSaveCentralControl(objectName, object) {
        const centralControl = {...this.state.centralControl};
        centralControl[objectName] = object;
        this.setCentralControlInState(centralControl);
        this.onSave()
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

                <AdminExpenseSheet
                    defaultExpanded
                    expenseSheets={this.state.centralControl.expenseSheets}
                    onCancel={this.onCancel.bind(this)}
                    onSaveCentralControl={this.onSaveCentralControl.bind(this)}
                />

                <Jummah
                    defaultExpanded
                    jummahs={this.state.centralControl.jummahs}
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
