import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {apiGetConfigurations} from "../../../../../store/picklist/picklistActions";
import {
    setCentralControl, setCentralControlEdit
} from "../../../../../store/admin/adminActions";
import {connect} from "react-redux";

class Configuration extends Component {

    constructor(props) {
        super(props);

        const centralControl = this.isValidCentralControl(props.centralControl)
            ? props.centralControl : props.centralControlEdit;

        this.state = {
            picklistConfigurations: props.picklistConfigurations,
            centralControl: centralControl
        };
    }

    isValidCentralControl(centralControl) {
        return centralControl && centralControl.companyId;
    }


    setPicklistConfigurations(picklistConfigurations) {
        this.setState({picklistConfigurations});
    }


    componentDidMount() {
        const {picklistConfigurations, centralControl} = this.state;

        if (!picklistConfigurations || picklistConfigurations.length < 1) {
            this.props.apiGetConfigurations(this.setPicklistConfigurations.bind(this));
        }


    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Configuration"
                    editMode={true}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={() => console.log("Save")}
                    onCancel={() => console.log("Cancel")}>

                    Test

                </CloseablePanel>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        picklistConfigurations: state.picklist.configurations,
        centralControl: state.admin.centralControl,
        centralControlEdit: state.admin.centralControlEdit
    }
};
const actions = {apiGetConfigurations, setCentralControl, setCentralControlEdit};

export default connect(mapStateToProps, actions)(Configuration);
