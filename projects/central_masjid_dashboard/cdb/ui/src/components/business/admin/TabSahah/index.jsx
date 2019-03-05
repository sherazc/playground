import React, {Component} from "react";
import SahahMonth from "./SalahMonth";
import ResetSalahLocation from "./ResetSalahLocation";
import {Button} from "@material-ui/core";

class TabSahah extends Component {
    render() {
        return (
            <div>
                <ResetSalahLocation/>
                <Button variant="outlined" color="primary">
                    Batch update
                </Button>
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
            </div>
        );
    }
}

export default TabSahah;