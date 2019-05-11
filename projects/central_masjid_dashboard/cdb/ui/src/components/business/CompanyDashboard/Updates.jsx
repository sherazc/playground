import React, {Component} from "react";
import Rod from "./Rod";
import "./Update.scss";

class Updates extends Component {

    state = this.createInitialState();

    createInitialState() {
        return {};
    }

    render() {
        return (
            <div>
                <div className="heading1 vMargin5">Reminders</div>
                <div className="heading3 vMargin6">Quran</div>

                <div><Rod/></div>
            </div>
        );
    }
}

export default Updates;