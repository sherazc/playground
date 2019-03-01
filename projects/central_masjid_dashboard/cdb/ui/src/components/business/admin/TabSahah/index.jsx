import React, {Component} from "react";
import {Button} from "@material-ui/core";
import SahahMonth from "./SalahMonth";

class TabSahah extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary">Reset Salah Time</Button>
                <SahahMonth/>
            </div>
        );
    }
}

export default TabSahah;