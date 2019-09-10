import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {apiGetConfigurations} from "../../../../../store/picklist/picklistActions";
import {connect} from "react-redux";
import InputField from "../../../../partials/InputField";

class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            picklistConfigurations: props.picklistConfigurations,
            customConfigurations: props.customConfigurations,
            editMode: false
        };
    }

    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.customConfigurations) {
            const newState =  {
                ...currentState,
                customConfigurations: newProps.customConfigurations
            };
            console.log("newState in configuration", newState);
            return newState;
        } else {
            return null;
        }
    }

    setPicklistConfigurations(picklistConfigurations) {
        this.setState({picklistConfigurations});
    }

    componentDidMount() {

        const {picklistConfigurations} = this.state;

        if (!picklistConfigurations || picklistConfigurations.length < 1) {
            this.props.apiGetConfigurations(this.setPicklistConfigurations.bind(this));
        }
    }

    getCustomConfigurationValueByName(name) {
        let customConfigurationValue = "";
        if (this.state.customConfigurations) {
            const foundCustomConfigurations = this.state.customConfigurations.filter(
                customConfiguration => customConfiguration.name === name);
            if (foundCustomConfigurations.length > 0) {
                customConfigurationValue = foundCustomConfigurations[0].value;
            }
        }
        return customConfigurationValue;
    }

    onChangeCustomConfigurations(event) {
        const name = event.target.name;
        const value = event.target.value;
        let customConfigurations = this.state.customConfigurations;
        if (!customConfigurations) {
            customConfigurations = [];
        }

        const alreadyExistingCcs = customConfigurations.filter((cc) => cc.name === name);

        if (alreadyExistingCcs.length > 0) {
            alreadyExistingCcs[0].value = value;
        } else {
            customConfigurations.push({name, value});
        }

        this.setState({customConfigurations: customConfigurations, editMode: true});
    }

    onCancel() {
        this.props.onCancel();
        this.setState({editMode: false});
    }

    onSave() {
        this.props.onSave();
        this.setState({editMode: false});
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Configuration"
                    editMode={this.state.editMode}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.props.onSave}
                    onCancel={this.onCancel.bind(this)}>
                    <table border="1">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Custom value</th>
                            <th>Default value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.picklistConfigurations.map((picklistConfiguration, index) => {
                            const name = picklistConfiguration.name;
                            const customValue = this.getCustomConfigurationValueByName(picklistConfiguration.name);
                            return (
                                <tr key={index}>
                                    <th>
                                        {picklistConfiguration.label}
                                    </th>
                                    <td>
                                        <InputField
                                            name={name}
                                            value={customValue}
                                            onChange={this.onChangeCustomConfigurations.bind(this)}/>
                                    </td>
                                    <td>
                                        {picklistConfiguration.defaultValue}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </CloseablePanel>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        picklistConfigurations: state.picklist.configurations
    }
};

const actions = {apiGetConfigurations};

export default connect(mapStateToProps, actions)(Configuration);
