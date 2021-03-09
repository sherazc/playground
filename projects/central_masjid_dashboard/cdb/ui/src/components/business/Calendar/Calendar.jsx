import React, {Component, useState, useEffect} from "react";
import {
    Select, MenuItem, Button
} from '@material-ui/core';

import axios from "axios";
import styles from "./Calendar.module.scss";
import Header02 from "../../layout/Header02/Header02";
import Content01 from "../../layout/Content01/Content01";
import Layout02 from "../../layout/Layout02/Layout02";
import Footer02 from "../../layout/Footer02/Footer02";

import {
    calendarTypes,
    monthsGregorian,
    monthsHijri,
    yearsGregorian,
    yearsHijri
} from "../../../services/CalendarService";
import {getReactRouterPathParamFromUrl, isSuccessfulAxiosServiceResponse} from "../../../services/utilities";
import PrayerDay from "../admin/TabPrayer/PrayersMonth/PrayerDay/PrayerDay";
import PrayerViewRow from "./PrayerViewRow";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export default (props) => {
    const createEmptySearch = () => {
      return {
          selectedType: 0,
          selectedYear: 1,
          selectedMonth: 0
      }
    };

    const [search, setSearch] = useState(createEmptySearch());
    const [months, setMonths] = useState([]);

    const createMenuItems = (items) => {
        return items.map((item, index) => <MenuItem key={index} value={index}>{item}</MenuItem>);
    }

    const getYears = (calendarType) => {
        return calendarType === 1 ? yearsHijri : yearsGregorian;
    }

    const getMonths = (calendarType) => {
        return calendarType === 1 ? monthsHijri : monthsGregorian;
    }

    const onChange = (event) => {
        setSearch({...search, [event.target.name]: event.target.value});
    }

    const onChangeType = (event) => {
        setSearch({...createEmptySearch(),
            "selectedType": event.target.value,
        });
    }

    useEffect(() => {
        // Send dimension message to parent
        const rootContainer = document.getElementById("root");
        const width = rootContainer.scrollWidth;
        const height = rootContainer.scrollHeight;
        window.parent.postMessage({"dimensions": {width, height}}, "*");
    })

    const onSearch = () => {
        // Sample api endpoint
        // http://localhost:8085/api/calendar/companyUrl/mh/type/gregorian/year/2020?month=1
        const companyUrl = getReactRouterPathParamFromUrl(props, "companyUrl");
        const type = calendarTypes[search.selectedType].toLowerCase();
        const year = getYears(search.selectedType)[search.selectedYear];
        let endpoint = `${baseUrl}/api/calendar/companyUrl/${companyUrl}/type/${type}/year/${year}`;
        if (search.selectedMonth) {
            endpoint = `${endpoint}?month=${search.selectedMonth}`;
        }

        axios.get(endpoint)
            .then(response => {
                console.log(response)
                if (isSuccessfulAxiosServiceResponse(response)) {
                    setMonths(response.data.target);
                } else {
                    console.log("Handle error message 1", response);
                }
                }, error => console.log("Handle error message 2", error))
            .catch(error => console.log("Handle error message 3", error));
    }

    const createMonth = (month) => {
        return (
        <div key={month.month.name} className={styles.monthContainer}>
            <table className={styles.monthTable}>
                <thead>
                <tr>
                    <th colSpan="100%">{month.month.number} {month.month.name}</th>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Hijri</th>
                    <th colSpan="2">Fajr</th>
                    <th>Shurooq</th>
                    <th colSpan="2">Zuhar</th>
                    <th colSpan="2">Asr</th>
                    <th>Maghrib</th>
                    <th colSpan="2">Isha</th>
                </tr>
                <tr>
                    <td></td>
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
                {month.prayers.map((p, i) => <PrayerViewRow key={i} prayer={p}/>)}
                </tbody>
            </table>
        </div>
        );
    }

    return (
        //
        // <Layout02>
        //     <Header02 title={"Calendar"}/>
        //     <Content01>
        //
        <div>
                <div className={styles.searchFieldContainer}>
                    <div className={styles.searchFieldBox}>
                        <div className={styles.searchFieldLabel}>
                            Calendar type
                        </div>
                        <Select
                            className={styles.searchField}
                            name="type"
                            label="Calendar Type"
                            onChange={onChangeType}
                            value={search.selectedType}>
                            {createMenuItems(calendarTypes)}
                        </Select>
                    </div>
                    <div className={styles.searchFieldBox}>
                        <div className={styles.searchFieldLabel}>
                            Year
                        </div>
                        <Select
                            className={styles.searchField}
                            name="selectedYear"
                            label="Year"
                            onChange={onChange}
                            value={search.selectedYear}>
                            {createMenuItems(getYears(search.selectedType))}
                        </Select>
                    </div>
                    <div className={styles.searchFieldBox}>
                        <div className={styles.searchFieldLabel}>
                            Month
                        </div>
                        <Select
                            className={styles.searchField}
                            name="selectedMonth"
                            label="Month"
                            onChange={onChange}
                            value={search.selectedMonth}>
                            {createMenuItems(getMonths(search.selectedType))}
                        </Select>
                    </div>
                </div>
                <div className={styles.searchButtonContainer}>
                    <Button onClick={onSearch} variant="outlined" color="primary">
                        Search
                    </Button>
                </div>
                {months.length > 0 &&
                    <div className={styles.calendarContainer}>
                        <div className={styles.calendarContainerChild}>
                        {months.map(m => createMonth(m))}
                        </div>
                    </div>
                }
                {months.length === 0 &&
                    <div className={styles.calendarContainer}>
                        No months
                    </div>
                }

        </div>
        //     </Content01>
        //     <Footer02/>
        // </Layout02>
        //
    );
}
