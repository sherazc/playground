import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";


const AllConfigurations = [
    {name: ""}
];

class Configuration extends Component {

    constructor(props) {
        super(props);

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

export default Configuration;
