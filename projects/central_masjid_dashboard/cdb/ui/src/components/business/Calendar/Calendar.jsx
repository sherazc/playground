import React, {Component} from "react";
import {
    Select, MenuItem
} from '@material-ui/core';

import styles from "./Calendar.module.scss";
import Header02 from "../../layout/Header02/Header02";
import Content01 from "../../layout/Content01/Content01";
import Layout02 from "../../layout/Layout02/Layout02";
import Footer02 from "../../layout/Footer02/Footer02";


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
            months = ["All Months", "1 - January", "2 - February", "3 - March", "4 - April", "5 - May", "6 - June",
                "7 - July", "8 - August", "9 - September", "10 - October", "11 - November", "12 - December"];
        } else {
            months = ["All Months", "1 - Al-Muḥarram - ٱلْمُحَرَّم", "2 - Ṣafar - صَفَر", "3 - Rabīʿ al-ʾAwwal - رَبِيع ٱلْأَوَّل",
                "4 - Rabīʿ ath-Thānī - رَبِيع ٱلثَّانِي", "5 - Jumadā al-ʾŪlā - جُمَادَىٰ ٱلْأُولَىٰ",
                "6 - Jumādā ath-Thāniyah - جُمَادَىٰ ٱلثَّانِيَة", "7 - Rajab - رَجَب", "8 - Shaʿbān - شَعْبَان",
                "9 - Ramaḍān - رَمَضَان", "10 - Shawwāl - شَوَّال", "11 - Ḏū al-Qaʿdah - ذُو ٱلْقَعْدَة",
                "12 - Ḏū al-Ḥijjah - ذُو ٱلْحِجَّة"];
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

    render() {
        return (
            <Layout02>
                <Header02 title={"Calendar"}/>
                <Content01>
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
                </Content01>
                <Footer02/>
            </Layout02>

        )
    }
}

export default Calendar;
