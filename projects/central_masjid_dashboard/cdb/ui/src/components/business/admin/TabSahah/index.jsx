import React, {Component} from "react";
import {Button} from "@material-ui/core";
import SahahMonth from "./SalahMonth";
import ResetSalahLocation from "./ResetSalahLocation";

class TabSahah extends Component {
    render() {
        return (
            <div>
                <ResetSalahLocation/>
                <SahahMonth/>
            </div>
        );
    }
}

export default TabSahah;