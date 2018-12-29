import React, {Component} from "react";

class UpdateCredentials extends Component {
    render() {
        return(
            <div>
                Update Credentials
                <br/>
                <button onClick={this.props.back}>Back</button>
            </div>
        );
    }
}

export default UpdateCredentials;
