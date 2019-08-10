import React, {Component} from "react";
import styles from "./PrayersMonth.module.scss"
import {dateToDisplayDateShort} from "../../../../../services/utilities"

class PrayersMonth extends Component {

    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    }

    createDays(prayersMonth) {
        const prayersRows = prayersMonth.map((prayer, index) => {
            console.log(prayer.date);
            return <tr key={index}>
                <td>
                    {dateToDisplayDateShort(prayer.date)}
                </td>
                <td>
                    b
                </td>
                <td>
                    c
                </td>
                <td>
                    d
                </td>
                <td>
                    e
                </td>
                <td>
                    f
                </td>
                <td>
                    g
                </td>
                <td>
                    h
                </td>
                <td>
                    i
                </td>
                <td>
                    j
                </td>
                <td>
                    k
                </td>
            </tr>
        });

        return prayersRows;
    }

    render() {
        const monthName = this.monthNames[this.props.monthIndex];

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
                            <th colSpan="2">Zuhar</th>
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
                        {this.createDays(this.props.prayersMonth)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PrayersMonth;