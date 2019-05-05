import React, {Component} from "react";
import Rod from "./Rod";

class Updates extends Component {

    state = this.createInitialState();

    constructor(props) {
        super(props);
    }

    createInitialState() {
        return {};
    }

    render() {
        return (
            <div>
                <Rod/>
            </div>
        );
    }
}

export default Updates;