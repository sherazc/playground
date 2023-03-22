import React, {useState, useEffect} from "react";
import {
    Select, MenuItem, Button
} from '@material-ui/core';

import axios from "axios";
import stylesCalendar from "./Calendar.module.scss";
import stylesCalendarPrint from "./CalendarPrint.module.scss";

import {
    calendarTypes,
    monthsGregorian,
    monthsHijri,
    yearsGregorian,
    yearsHijri
} from "../../../services/CalendarService";
import {
    getQueryParam,
    getReactRouterPathParamFromUrl,
    isSuccessfulAxiosServiceResponse
} from "../../../services/utilities";
import PrayerViewRow from "./PrayerViewRow";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export default (props) => {
    const createEmptySearch = () => {
      return {
          selectedType: 0,
          selectedYear: 2,
          selectedMonth: 0
      }
    };

    const [search, setSearch] = useState(createEmptySearch());
    const [months, setMonths] = useState([]);
    const [company, setCompany] = useState({});
    const [styles, setStyles] = useState(stylesCalendar);
    const [view, setView] = useState(stylesCalendar);
    const [printHref, setPrintHref] = useState("");

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
        const rootContainer = document.getElementById("calendarRoot");
        const width = rootContainer.scrollWidth;
        const height = rootContainer.scrollHeight;
        window.parent.postMessage({"dimensions": {width, height}}, "*");

        setView(getQueryParam("view"));
    })


    useEffect(() => {
        const companyUrl = getReactRouterPathParamFromUrl(props, "companyUrl");
        const type = getQueryParam("type");
        const year = getQueryParam("year");
        const month = getQueryParam("month");

        if (!companyUrl || !type || !year) {
            return;
        }

        setStyles(stylesCalendarPrint);
        let endpoint = `${baseUrl}/api/calendar/companyUrl/${companyUrl}/type/${type}/year/${year}`;
        if (month) {
            endpoint = `${endpoint}?month=${month}`;
        }

        callSearchApi(endpoint);
    }, [view]);

    const setSearchResult = (companyPrayerMonths) => {
        if (companyPrayerMonths.company && companyPrayerMonths.company.id) {
            setCompany(companyPrayerMonths.company);
        }

        if (companyPrayerMonths.monthPrayers) {
            setMonths(companyPrayerMonths.monthPrayers);
        }
    }

    const onSearch = () => {
        const companyUrl = getReactRouterPathParamFromUrl(props, "companyUrl");
        const type = calendarTypes[search.selectedType].toLowerCase();
        const year = getYears(search.selectedType)[search.selectedYear];
        let endpoint = `${baseUrl}/api/calendar/companyUrl/${companyUrl}/type/${type}/year/${year}`;
        let tempPrintLinkHref = `${baseUrl}/calendar/${companyUrl}?view=print&type=${type}&year=${year}`;
        if (search.selectedMonth) {
            endpoint = `${endpoint}?month=${search.selectedMonth}`;
            tempPrintLinkHref = `${tempPrintLinkHref}&month=${search.selectedMonth}`;
        }
        callSearchApi(endpoint)
        setPrintHref(tempPrintLinkHref)
    }

    const callSearchApi = (endpoint) => {
        axios.get(endpoint)
            .then(response => {
                if (isSuccessfulAxiosServiceResponse(response)) {
                    setSearchResult(response.data.target);
                } else {
                    console.error("Calendar API failed 1", endpoint, response);
                }
            }, error => console.error("Calendar API failed 2", endpoint, error))
            .catch(error => console.error("Calendar API failed 3", endpoint, error));
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
                    <th>Fajr</th>
                    <th>Shurooq</th>
                    <th>Zuhr</th>
                    <th>Asr</th>
                    <th>Maghrib</th>
                    <th>Isha</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <div>Azan</div>
                        <div>Iqmah</div>
                    </td>
                    <td></td>
                    <td>
                        <div>Azan</div>
                        <div>Iqmah</div>
                    </td>
                    <td>
                        <div>Azan</div>
                        <div>Iqmah</div>
                    </td>
                    <td>
                        <div>Azan</div>
                        <div>Iqmah</div>
                    </td>
                    <td>
                        <div>Azan</div>
                        <div>Iqmah</div>
                    </td>
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
        <div id="calendarRoot" className={styles.calendarRoot}>
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
                    <div className={styles.printLink}>
                        <a href={printHref} target="_blank">
                            🖨 Print
                        </a>
                    </div>
                }
                {company.name &&
                    <div className={styles.headingContainer}>
                        <div className={styles.headingText}>Salah Calendar</div>
                        <div className={styles.headingCompanyName}>{company.name}</div>
                        {company.address &&
                        <div className={styles.headingCompanyAddress}>
                            <div>
                                {company.address.street}
                            </div>
                            <div>
                                {company.address.city}, {company.address.state} {company.address.zip}
                            </div>
                        </div>}
                    </div>
                }
                {months.length > 0 &&
                    <div className={styles.calendarContainer}>
                        <div className={styles.calendarContainerChild}>
                        {months.map(m => createMonth(m))}
                        </div>
                    </div>
                }
                {months.length === 0 &&
                    <div className={styles.calendarContainer}>
                        Select calendar, year, month and click "Search"
                    </div>
                }

        </div>
    );
}
