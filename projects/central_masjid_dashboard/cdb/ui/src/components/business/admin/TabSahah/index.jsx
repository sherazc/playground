import React, {Component} from "react";
import SahahMonth from "./SalahMonth";
import ResetSalahLocation from "./ResetSalahLocation";

class TabSahah extends Component {
    render() {
        return (
            <div>
                <ResetSalahLocation/>
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
            </div>
        );
    }
}

export default TabSahah;