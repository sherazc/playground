import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
// import InputField from "../../../../partials/InputField";

class Funds extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            funds: props.funds ? props.funds : []
        }
    }

    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.funds && newProps.funds.length !== currentState.funds.length) {
            const newState =  {
                ...currentState,
                funds: newProps.funds
            };
            console.log("newState in funds", newState);
            return newState;
        } else {
            return null;
        }
    }

    makeFundUi(fund) {
        return (
            <div>
                <table border="1">
                    <thead>
                    <tr><th>{fund.name}</th></tr>
                    </thead>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Funds"
                    editMode={this.state.editMode}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.props.onSave}
                    onCancel={this.props.onCancel}>
                    <div>
                        {this.state.funds.map(fund => this.makeFundUi(fund))}
                    </div>

                </CloseablePanel>
            </div>
        );
    }
}

export default Funds;
