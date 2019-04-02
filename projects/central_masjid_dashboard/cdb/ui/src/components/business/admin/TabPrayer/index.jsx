import React, {Component} from "react";
import SahahMonth from "./PrayerMonth";
import ResetPrayerLocation from "./ResetPrayerLocation";
import {Button} from "@material-ui/core";

class TabPrayer extends Component {


    constructor(props) {
        super(props);
        this.handleUpdatedPrayerTime = this.handleUpdatedPrayerTime.bind(this);
        this.state = {prayersMonths: []};
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }


    handleUpdatedPrayerTime(yearPrayers) {
        const prayersMonths = yearPrayers.reduce(this.prayerReducer, []);
        this.setState({prayersMonths});
    }

    prayerReducer(prayersMonths, prayer) {
        const prayerDate = new Date(prayer.date);
        const monthIndex = prayerDate.getUTCMonth();
        if (!prayersMonths[monthIndex]) {
            prayersMonths[monthIndex] = [];
        }
        prayersMonths[monthIndex].push(prayer);
        return prayersMonths;
    };

    makePrayerMonths() {
        const {prayersMonths} = this.state;
        console.log(prayersMonths);
        if (!prayersMonths) {
            return;
        }
        console.log("OK");
        return <div>Waooo</div>;
    }

    render() {
        return (
            <div>
                <ResetPrayerLocation handleUpdatedPrayerTime={this.handleUpdatedPrayerTime}/>
                <Button variant="outlined" color="primary">
                    Batch update
                </Button>
                {this.makePrayerMonths()}
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
                <SahahMonth/>
            </div>
        );
    }
}

export default TabPrayer;