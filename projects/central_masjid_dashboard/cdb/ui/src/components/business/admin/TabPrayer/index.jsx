import React, {Component} from "react";
import SahahMonth from "./PrayerMonth";
import ResetPrayerLocation from "./ResetPrayerLocation";
import {Button} from "@material-ui/core";

class TabPrayer extends Component {



    render() {
        return (
            <div>
                <ResetPrayerLocation/>
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

export default TabPrayer;