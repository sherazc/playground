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

                <div className="sectionHeading">Reminders</div>
                <div>Quran</div>
                <div><Rod/></div>
            </div>
        );
    }
}

export default Updates;