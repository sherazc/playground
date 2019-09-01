import React, {Component} from "react";
import styles from "./PrayersMonth.module.scss"
import {
    dateToDisplayDateShort,
    datesMonthDatePart
} from "../../../../../services/utilities"
import InputField from "../../../../partials/InputField";

class PrayersMonth extends Component {

    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

    }

    createDay(prayer, index, viewMode) {
        const monthDate = datesMonthDatePart(prayer.date)
        return (
            <tr key={index}>
                <td>
                    {dateToDisplayDateShort(prayer.date)}
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.fajr}
                        name={`fajr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.fajrIqama}
                        name={`fajrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.sunrise}
                        name={`sunrise${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.dhuhr}
                        name={`dhuhr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.dhuhrIqama}
                        name={`dhuhrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.asr}
                        name={`asr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.asrIqama}
                        name={`asrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.maghrib}
                        name={`maghrib${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.isha}
                        name={`isha${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.props.onValueChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.ishaIqama}
                        name={`ishaIqama${monthDate}`}/>
                </td>
            </tr>
        );
    }

    render() {
        const monthName = this.monthNames[this.props.monthIndex];
        const viewMode = this.props.editMode ? "edit" : "view";
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
                        {this.props.prayersMonth.map((prayer, index) => this.createDay(prayer, index, viewMode))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PrayersMonth;