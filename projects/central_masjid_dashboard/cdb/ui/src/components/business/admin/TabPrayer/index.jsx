import React, {Component} from "react";
import SahahMonth from "./PrayerMonth";
import ResetPrayerLocation from "./ResetPrayerLocation";
import {Button} from "@material-ui/core";

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.handleUpdatedPrayerTime = this.handleUpdatedPrayerTime.bind(this);
        this.state = {prayersMonths: []}
    }


    handleUpdatedPrayerTime(yearPrayers) {
        const prayersMonths = yearPrayers.reduce(this.prayerReducer, new Array());
        console.log(prayersMonths);
    }

    prayerReducer(prayersMonths, prayer) {
        const prayerDate = new Date(prayer.date);
        const monthIndex = prayerDate.getUTCMonth();
        if (!prayersMonths[monthIndex]) {
            prayersMonths[monthIndex] = new Array();
        }
        prayersMonths[monthIndex].push(prayer);
        return prayersMonths;
    };

    render() {
        return (
            <div>
                <ResetPrayerLocation handleUpdatedPrayerTime={this.handleUpdatedPrayerTime}/>
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