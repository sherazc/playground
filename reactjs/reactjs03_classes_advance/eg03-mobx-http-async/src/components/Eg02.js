import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import JSONPretty from "react-json-pretty";

@inject("Eg02Solution1")
@observer
export default class Eg02 extends Component {

    componentDidMount() {
        this.props.Eg02Solution1.loadUsers();
    }

    render() {
        return (
            <div>
                <h3>Eg02</h3>
                <JSONPretty json={this.props.Eg02Solution1.users} />
            </div>
        );
    }
}
36798168