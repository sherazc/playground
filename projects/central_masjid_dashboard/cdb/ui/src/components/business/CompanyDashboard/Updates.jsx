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
                <div className="heading1 sectionHeadingSpacing">Reminders</div>
                <div className="heading2">Quran</div>


                <div className="heading1">Heading1</div>
                <div className="heading2">Heading2</div>
                <div className="heading3">Heading3</div>
                <div className="heading4">Heading4</div>
                <div className="heading5">Heading5</div>
                <div><Rod/></div>
            </div>
        );
    }
}

export default Updates;