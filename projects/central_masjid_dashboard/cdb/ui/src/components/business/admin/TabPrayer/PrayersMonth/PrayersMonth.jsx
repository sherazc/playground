import React, {Component} from "react";
import styles from "./PrayersMonth.module.scss"
import {dateToDisplayDateShort} from "../../../../../services/utilities"
import InputField from "../../../../partials/InputField";

class PrayersMonth extends Component {

    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createDays(prayersMonth, editMode) {
        const viewMode = editMode ? "edit" : "view";

        const prayersRows = prayersMonth.map((prayer, index) => {
            return <tr key={index}>
                <td>
                    {dateToDisplayDateShort(prayer.date)}
                </td>
                <td>

                    <InputField
                        mode={viewMode}
                        value={prayer.fajr}
                    />

                </td>
                <td>
                    {prayer.fajrIqama}
                </td>
                <td>
                    {prayer.sunrise}
                </td>
                <td>
                    {prayer.dhuhr}
                </td>
                <td>
                    {prayer.dhuhrIqama}

                </td>
                <td>
                    {prayer.asr}
                </td>
                <td>
                    {prayer.asrIqama}

                </td>
                <td>
                    {prayer.maghrib}

                </td>
                <td>
                    {prayer.isha}
                </td>
                <td>
                    {prayer.ishaIqama}
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
                        {this.createDays(this.props.prayersMonth, this.props.editMode)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PrayersMonth;