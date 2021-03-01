import React, {Component, useState} from "react";
import {
    Select, MenuItem, Button
} from '@material-ui/core';

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

export default () => {
    const createEmptySearch = () => {
      return {
          selectedType: 0,
          selectedYear: 1,
          selectedMonth: 0
      }
    };

    const [search, setSearch] = useState(createEmptySearch());

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


    return (
        <Layout02>
            <Header02 title={"Calendar"}/>
            <Content01>
                <div>
                    <div>
                        <Select
                            name="type"
                            label="Calendar Type"
                            onChange={onChangeType}
                            value={search.selectedType}>
                            {createMenuItems(calendarTypes)}
                        </Select>
                    </div>
                    <div>
                        <Select
                            name="selectedYear"
                            label="Year"
                            onChange={onChange}
                            value={search.selectedYear}>
                            {createMenuItems(getYears(search.selectedType))}
                        </Select>
                    </div>
                    <div>
                        <Select
                            name="selectedMonth"
                            label="Month"
                            onChange={onChange}
                            value={search.selectedMonth}>
                            {createMenuItems(getMonths(search.selectedType))}
                        </Select>
                    </div>
                </div>
                <div>
                    <Button>Search</Button>
                </div>
            </Content01>
            <Footer02/>
        </Layout02>
    );
}
