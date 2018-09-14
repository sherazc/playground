import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import JSONPretty from "react-json-pretty";

@inject("Eg04Solution3")
@observer
export default class Eg04 extends Component {
    componentDidMount() {
        this.props.Eg04Solution3.loadUsers();
    }

    render() {
        return(
            <div>
                <h3>Eg04</h3>
                <JSONPretty json={this.props.Eg04Solution3.users}/>
            </div>
        );
    }

}