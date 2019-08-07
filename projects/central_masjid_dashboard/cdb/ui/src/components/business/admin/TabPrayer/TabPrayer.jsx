import React, {Component} from "react";
import PrayersMonth from "./PrayersMonth";
import ResetPrayerLocation from "./ResetPrayerLocation";
import {Button} from "@material-ui/core";

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.handleUpdatedPrayerTime = this.handleUpdatedPrayerTime.bind(this);
        this.state = {prayersMonths: []};
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
        if (prayersMonths && prayersMonths.length > 0) {
            return prayersMonths.map(
                    (prayersMonth, index) => <PrayersMonth prayersMonth monthIndex={index} key={index}/>
                );
        } else {
            // return <div>Prayers not setup</div>;
            return <PrayersMonth monthIndex="1" />;
        }
    }

    render() {
        return (
            <div>
                <ResetPrayerLocation handleUpdatedPrayerTime={this.handleUpdatedPrayerTime}/>
                <Button variant="outlined" color="primary">
                    Batch update
                </Button>
                {this.makePrayerMonths()}

            </div>
        );
    }
}

export default TabPrayer;