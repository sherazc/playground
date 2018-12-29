import React, {Component} from "react";

class ResetCredentials extends Component {
    render() {
        return(
            <div>
                Reset Credentials
                <br/>
                <button onClick={this.props.back}>Back</button>
            </div>
        );
    }
}

export default ResetCredentials;