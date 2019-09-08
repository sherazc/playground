import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {apiGetConfigurations} from "../../../../../store/picklist/picklistActions";
import {connect} from "react-redux";
import InputField from "../../../../partials/InputField";

class Configuration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            picklistConfigurations: props.picklistConfigurations
        };
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
        if (this.props.customConfigurations) {
            const foundCustomConfigurations = this.props.customConfigurations.filter(
                customConfiguration => customConfiguration.name === name);
            if (foundCustomConfigurations.length > 0) {
                customConfigurationValue = foundCustomConfigurations[0].value;
            }
        }
        return customConfigurationValue;
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Configuration"
                    editMode={true}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.props.onSave}
                    onCancel={this.props.onCancel}>
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
                                            onChange={this.props.onChangeCustomConfigurations}/>
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
