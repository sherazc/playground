import React, {Component} from "react";
import styles from "./PrayersMonth.module.scss"
import PrayerDay from "./PrayerDay/PrayerDay";
import {MODE_EDIT, MODE_VIEW} from "../../../../partials/InputField";
import {MONTH_NAMES} from "mdb-core-js";

class PrayersMonth extends Component {

    constructor(props) {
        super(props);
        this.monthNames = MONTH_NAMES;
    }

    render() {
        const monthName = this.monthNames[this.props.monthIndex];
        const viewMode = this.props.editMode ? MODE_EDIT : MODE_VIEW;
        return (
            <div>
                <div className={styles.prayerMonthGridContainer}>
                    <table className={styles.prayerMonthGrid}>
                        <thead>
                        <tr>
                            <th colSpan="100%">{monthName}</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th colSpan="2">Fajr</th>
                            <th>Shurooq</th>
                            <th colSpan="2">Zuhr</th>
                            <th colSpan="2">Asr</th>
                            <th>Maghrib</th>
                            <th colSpan="2">Isha</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Azan</td>
                            <td>Iqmah</td>
                            <td></td>
                            <td>Azan</td>
                            <td>Iqmah</td>
                            <td>Azan</td>
                            <td>Iqmah</td>
                            <td>Azan</td>
                            <td>Azan</td>
                            <td>Iqmah</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.prayersMonth.map((prayer, index) => <PrayerDay key={index} onValueChange={this.props.onValueChange} prayer={prayer} viewMode={viewMode}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PrayersMonth;
