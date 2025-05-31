import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import JSONPretty from "react-json-pretty";

@inject("Eg03Solution2")
@observer
export default class Eg03 extends Component {
    componentDidMount() {
        this.props.Eg03Solution2.loadUsers();
    }

    render() {
        return(
            <div>
                <h3>Eg03</h3>
                <JSONPretty json={this.props.Eg03Solution2.users} />
            </div>
        );
    }

}