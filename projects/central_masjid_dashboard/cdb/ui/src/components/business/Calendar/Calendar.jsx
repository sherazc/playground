import React, {Component} from "react";
import {
    Select, MenuItem
} from '@material-ui/core';

import styles from "./Calendar.module.scss";


class Calendar extends Component {

    constructor(props) {
        super(props);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    state = {
        // TODO this can be moved in class property
        calendarTypes: ["Gregorian", "Hijri"],
        calendarTypeSelected: "Gregorian",
        months: this.getMonths("Gregorian"),
        monthSelected: "",
        years: this.getYears("Gregorian", 2021),
        yearSelected: 2021
    }

    getMonths(calendarType) {
        let months;
        if (calendarType && calendarType === "Gregorian") {
            months = ["January", "Feburary"];
        } else {
            months = ["a", "b"];
        }

        return months;
    }

    getYears(calendarType, year) {
        let months;
        if (calendarType && calendarType === "Gregorian") {
            months = [100, 200, 300];
        } else {
            months = [1000, 2000, 3000];
        }
    }

    onChangeSelect(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({months: this.getMonths(event.target.value)});
    }

    createMenuItems(items) {
        return items.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>);
    }

    render() {return (<div>
        <div>
            <Select
                name="calendarTypeSelected"
                value={this.state.calendarTypeSelected}
                label="Calendar Type"
                onChange={this.onChangeSelect}>
                {this.createMenuItems(this.state.calendarTypes)}
            </Select>

            <Select
                name="monthSelected"
                value={this.state.monthSelected}
                label="Month"
                onChange={this.onChangeSelect}>
                {this.createMenuItems(this.state.months)}
            </Select>
        </div>
    </div>)};
}

export default Calendar;