import React, {Component} from "react";
import axios from "axios";
import styles from "./SalahTime.module.scss";
import {
    time24To12,
    dateToDisplayDateShort,
    dateToDisplayTime,
    getConfigValue
} from "../../../../services/utilities";

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
            axios
                .get(`${baseUrl}/api/prayer/companyId/${this.props.centralControl.companyId}/month/2/day/2`)
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
                        not done<br/>
                        {dateToDisplayDateShort(prayer.date)}<br/>{dateToDisplayTime(prayer.date)}
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
                    <td>02/01<br/>4:30 pm</td>
                </tr>
                <tr>
                    <th>Asr</th>
                    <td>{time24To12(prayer.asr)}</td>
                    <td>{time24To12(prayer.asrIqama)}</td>
                    <td>02/01<br/>4:30 pm</td>
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
                    <td>02/15<br/>8:00 pm</td>
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
        return (
            <div>
                <div className={styles.salahTimeDateHeading}>
                    January 29, 2019
                    <br/>
                    Jumada al-awwal 23, 1440
                </div>

                {this.createPrayerGrid(this.state.prayer)}




            </div>
        );
    }
}

export default SalahTime;
