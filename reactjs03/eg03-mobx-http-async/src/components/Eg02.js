import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import Eg02Solution1 from "../stores/Eg02Solution1";

@observer
@inject("Eg02Solution1")
export default class Eg02 extends Component {
    render() {
        return (
            <div>Eg02</div>
        );
    }
}