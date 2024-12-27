import React, {Component} from "react";
import axios from "axios";
import styles from "./SalahTime.module.scss";
import {
    getConfigValue,
    removeTimeFromDateObject
} from "../../../../services/utilities";

import {
    dateToDisplayDateLong,
    dateToDisplayDateShort,
    hijriStringToDisplayDateLong,
    isoDateToJsDate,
    time24To12
} from "mdb-core-js";
// import PrayerCountDown from "../PrayerCountDown/PrayerCountDown";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class SalahTime extends Component {

    constructor(props) {
        super(props);
        this.loadingPrayers = false;
        this.state = {
            prayer: {},
            prayerFound: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
                    } else {
                        this.setState({
                            prayerFound: false
                        });
                    }
                }).catch(error => console.log(error));
        }
    }


    createPrayerGrid(prayer, prayerFound) {
        if (prayerFound === false) {
            return <div>Prayer time not setup. Please contact dashboard admin.</div>
        }
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
                    <td className={this.blinkClassIfRequired(prayer.fajrChangeDate)}>
                        {dateToDisplayDateShort(isoDateToJsDate(prayer.fajrChangeDate))}
                        <br/>
                        {time24To12(prayer.fajrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Shurooq</th>
                    <td colSpan="3">{time24To12(prayer.sunrise)}</td>
                </tr>
                <tr>
                    <th>Zuhr</th>
                    <td>{time24To12(prayer.dhuhr)}</td>
                    <td>{time24To12(prayer.dhuhrIqama)}</td>
                    <td className={this.blinkClassIfRequired(prayer.dhuhrChangeDate)}>
                        {dateToDisplayDateShort(isoDateToJsDate(prayer.dhuhrChangeDate))}
                        <br/>
                        {time24To12(prayer.dhuhrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Asr</th>
                    <td>{time24To12(prayer.asr)}</td>
                    <td>{time24To12(prayer.asrIqama)}</td>
                    <td className={this.blinkClassIfRequired(prayer.asrChangeDate)}>
                        {dateToDisplayDateShort(isoDateToJsDate(prayer.asrChangeDate))}
                        <br/>
                        {time24To12(prayer.asrChange)}
                    </td>
                </tr>
                <tr>
                    <th>Maghrib</th>
                    <td>{time24To12(prayer.maghrib)}</td>
                    <td>
                        {time24To12(prayer.maghribIqama)}
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <th>Isha</th>
                    <td>{time24To12(prayer.isha)}</td>
                    <td>{time24To12(prayer.ishaIqama)}</td>
                    <td className={this.blinkClassIfRequired(prayer.ishaChangeDate)}>
                        {dateToDisplayDateShort(isoDateToJsDate(prayer.ishaChangeDate))}
                        <br/>
                        {time24To12(prayer.ishaChange)}
                    </td>
                </tr>
                <tr>
                    <th>Jum'ah</th>
                    <td colSpan="3">
                        <div style={{whiteSpace: "normal", margin: "0 auto"}}>
                            {getConfigValue("jumah_prayer", this.props.companyConfigurations)}
                            {this.getJummahKhateeb(this.props.centralControl)}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    getJummahKhateeb(centralControl) {
        if (!centralControl || !centralControl.jummahs || centralControl.jummahs.length < 1) {
            return;
        }

        function toDate(dateString) {

            const dateSplit = dateString.split("-");
            if (!dateSplit || dateSplit.length < 3) {
                return;
            }
            const year = +dateSplit[0];
            const month = +dateSplit[1] - 1;
            const date = +dateSplit[2];
            if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(date)) {
                return;
            }

            return new Date(year, month, date);
        }
        
        function sortJummah(j1, j2) {
            if (j1.date.getTime() > j2.date.getTime()) {
                return 1;
            }
            if (j1.date.getTime() < j2.date.getTime()) {
                return -1;
            }
            return 0;
        }

        const today = new Date();
        const millisInDays = 86400000;

        const jummahs = centralControl.jummahs
            .filter(j => j.enabled && j.date && j.khateeb) // jummah is enabled and all values are available
            .map(j => {  // Convert date string to date object
                return {
                    date: toDate(j.date),
                    khateeb: j.khateeb
                }
            })
            .filter(j => j.date) // Filter where date is missing
            .filter(j => j.date.getTime() + millisInDays > today.getTime()) // Filter future jummahs
            .sort(sortJummah); // Sort by Date

        let jummahDetails = undefined;
        if (jummahs && jummahs.length > 0) {
            const jummah = jummahs[0];
            jummahDetails = `${jummah.date.getMonth() + 1}/${jummah.date.getDate()} - Khateeb: ${jummah.khateeb}`
        }

        if (jummahDetails) {
            return (<>
                <hr style={{border: "1px solid #B8B72F", margin: "2px auto", width: "30%"}}/>
                {jummahDetails}
            </>);
        }
        return undefined
    }

    blinkClassIfRequired(changeDate) {
        if (!changeDate) return "";
        const iqamaChangeDate = isoDateToJsDate(changeDate);
        if (!iqamaChangeDate) return "";

        const daysAfterToday = removeTimeFromDateObject(new Date());
        daysAfterToday.setDate(daysAfterToday.getDate() + 3);

        return iqamaChangeDate.getTime() < daysAfterToday.getTime() ? styles.red_blink_text : "";
    }

    render() {
        const today = new Date();
        const hijriDate = hijriStringToDisplayDateLong(this.state.prayer.hijriString);
        return (
            <div>
                {/*<PrayerCountDown prayer={this.state.prayer}/>*/}
                <div className={styles.salahTimeDateHeading}>
                    {dateToDisplayDateLong(today)}
                    <br/>
                    {hijriDate}
                </div>
                {this.createPrayerGrid(this.state.prayer, this.state.prayerFound)}
            </div>
        );
    }
}

export default SalahTime;
