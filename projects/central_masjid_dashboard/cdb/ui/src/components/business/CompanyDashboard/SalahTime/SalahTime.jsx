import React, {Component} from "react";
import axios from "axios";
import styles from "./SalahTime.module.scss";
import {
    time24To12,
    dateToDisplayDateShort,
    dateToDisplayTime,
    getConfigValue,
    dateToDisplayDateLong
} from "../../../../services/utilities";
import {
    writeIslamicDate
} from "../../../../services/hijricalendar-kuwaiti";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class SalahTime extends Component {

    constructor(props) {
        super(props);
        this.loadingPrayers = false;
        this.state = {
            prayer: {}
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.centralControl.id && !this.state.prayer.date && !this.loadingPrayers) {
            this.loadingPrayers = true;
            const today = new Date();

            const serviceEndpoint = `${baseUrl}/api/prayer/companyId/${this.props.centralControl.companyId}/month/${today.getMonth() + 1}/day/${today.getDate()}`;

            axios
                .get(serviceEndpoint)
                .then(response => {
                    if (response.data.successful) {
                        this.setState({
                            prayer: response.data.target
                        });
                    }
                }).catch(error => console.log(error));
        }
    }


    createPrayerGrid(prayer) {
        if (!prayer.date) {
            return <div>Loading...</div>
        }
        return (
            <table className={styles.salahTimeTable}>
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Azan</th>
                    <th>Iqama</th>
                    <th>Next Change</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Fajr</th>
                    <td>{time24To12(prayer.fajr)}</td>
                    <td>{time24To12(prayer.fajrIqama)}</td>
                    <td>
                        {dateToDisplayDateShort(prayer.fajrChangeDate)}
                        <br/>
                        {time24To12(prayer.fajrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Shurooq</th>
                    <td colSpan="3">{time24To12(prayer.sunrise)}</td>
                </tr>
                <tr>
                    <th>Thuhr</th>
                    <td>{time24To12(prayer.dhuhr)}</td>
                    <td>{time24To12(prayer.dhuhrIqama)}</td>
                    <td>
                        {dateToDisplayDateShort(prayer.dhuhrChangeDate)}
                        <br/>
                        {time24To12(prayer.dhuhrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Asr</th>
                    <td>{time24To12(prayer.asr)}</td>
                    <td>{time24To12(prayer.asrIqama)}</td>
                    <td>
                        {dateToDisplayDateShort(prayer.asrChangeDate)}
                        <br/>
                        {time24To12(prayer.asrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Maghrib</th>
                    <td>{time24To12(prayer.maghrib)}</td>
                    <td>5 min</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <th>Isha</th>
                    <td>{time24To12(prayer.isha)}</td>
                    <td>{time24To12(prayer.ishaIqama)}</td>
                    <td>
                        {dateToDisplayDateShort(prayer.ishaChangeDate)}
                        <br/>
                        {time24To12(prayer.ishaChange)}
                    </td>
                </tr>
                <tr>
                    <th>Jum'ah</th>
                    <td colSpan="3">
                        {getConfigValue("jumah_prayer", this.props.companyConfigurations)}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }


    render() {
        const today = new Date();
        const hijriAdjustDays = getConfigValue("hijri_adjust_days", this.props.companyConfigurations);
        return (
            <div>
                <div className={styles.salahTimeDateHeading}>
                    {dateToDisplayDateLong(today)}
                    <br/>
                    {writeIslamicDate(today, hijriAdjustDays)}
                </div>
                {this.createPrayerGrid(this.state.prayer)}
            </div>
        );
    }
}

export default SalahTime;
