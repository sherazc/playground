import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {apiGetConfigurations} from "../../../../../store/picklist/picklistActions";
import {connect} from "react-redux";

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

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Configuration"
                    editMode={true}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={() => console.log("Save")}
                    onCancel={() => console.log("Cancel")}>

                    <ul>
                    {this.state.picklistConfigurations
                        .map((c, i) => <li key={i}>{c.label}</li>)
                    }
                    </ul>
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
