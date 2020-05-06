import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import JSONPretty from "react-json-pretty";

@inject("Eg05Solution4")
@observer
export default class Eg05 extends Component {
    componentDidMount() {
        this.props.Eg05Solution4.loadUsers();
    }

    render() {
        return(
            <div>
                <h3>Eg05</h3>
                <JSONPretty json={this.props.Eg05Solution4.users}/>
            </div>
        );
    }
}