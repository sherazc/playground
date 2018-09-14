import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import JSONPretty from "react-json-pretty";

@inject("Eg01StoreWrongImplementation")
@observer
export default class Eg01 extends Component {

    componentDidMount() {
        this.props.Eg01StoreWrongImplementation.loadUsers();
    }

    render() {
        return(
            <div>
                <h3>Eg01</h3>
                <JSONPretty json={this.props.Eg01StoreWrongImplementation.users} />
            </div>
        );
    }
}