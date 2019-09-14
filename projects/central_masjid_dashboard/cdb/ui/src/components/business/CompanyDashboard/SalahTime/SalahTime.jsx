import React, {Component} from "react";
import styles from "./SalahTime.module.scss";

class SalahTime extends Component {
    render() {
        return (
            <div>
                <div className={styles.salahTimeDateHeading}>
                    January 29, 2019
                    <br/>
                    Jumada al-awwal 23, 1440
                </div>
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
                        <td>6:25 am</td>
                        <td>6:45 am</td>
                        <td>02/15 <br/>6:30 am</td>
                    </tr>
                    <tr>
                        <th>Shurooq</th>
                        <td colSpan="3">7:36 am</td>
                    </tr>
                    <tr>
                        <th>Thuhr</th>
                        <td>12:51 pm</td>
                        <td>2:00 pm</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>Asr</th>
                        <td>3:44 pm</td>
                        <td>4:00 pm</td>
                        <td>02/01<br/>4:30 pm</td>
                    </tr>
                    <tr>
                        <th>Maghrib</th>
                        <td>6:05 pm</td>
                        <td>5 min</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>Isha</th>
                        <td>7:17 pm</td>
                        <td>7:45 pm</td>
                        <td>02/15<br/>8:00 pm</td>
                    </tr>
                    <tr>
                        <th>Jum'ah</th>
                        <td colSpan="3">
                            Jum'ah salah starts 2:00pm
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SalahTime;