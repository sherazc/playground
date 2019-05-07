import React, {Component} from "react";
import Rod from "./Rod";

class Updates extends Component {

    state = this.createInitialState();

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