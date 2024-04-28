import React, {Component} from "react";
import {
    datesMonthDatePart,
    equalObjects
} from "../../../../../../services/utilities"
import InputField from "../../../../../partials/InputField";
import {dateToDisplayDateShort, isoDateToJsDate} from "mdb-core-js";

class PrayerDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prayer: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (!this.state.prayer.date && this.props.prayer.date) {
            this.setState({prayer: this.props.prayer});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldUpdateStateFromProps(this.props, prevProps, this.state)) {
            this.setState({prayer: this.props.prayer});
        }
    }

    shouldUpdateStateFromProps(currentProps, prevProps, state) {
        const currentViewMode = currentProps.viewMode;
        const previousViewMode = prevProps.viewMode;
        const prayerCurrentProps = currentProps.prayer;
        const prayerPreviousProps = prevProps.prayer;
        const prayerState = state.prayer;

        return (previousViewMode && currentViewMode // Edit mode View mode switch
                && previousViewMode !== currentViewMode)
            || (!equalObjects(prayerCurrentProps, prayerPreviousProps) // new props.prayer have arrived
                &&!equalObjects(prayerCurrentProps, prayerState)); // and props.prayer != state.prayer
    }


    onChange(event) {
        this.props.onValueChange();
        const {name, value} = event.target;
        const newPrayer = {
            ...this.state.prayer
        };
        newPrayer[name] = value;
        this.setState({prayer: newPrayer});
    }

    render() {
        const {viewMode} = this.props;
        const {prayer} = this.state;
        const monthDate = datesMonthDatePart(isoDateToJsDate(prayer.date));
        return (
            <tr>
                <td>
                    {dateToDisplayDateShort(isoDateToJsDate(prayer.date))}
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.fajr}
                        name="fajr"
                        id={`fajr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.fajrIqama}
                        name="fajrIqama"
                        id={`fajrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.sunrise}
                        name="sunrise"
                        id={`sunrise${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.dhuhr}
                        name="dhuhr"
                        id={`dhuhr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.dhuhrIqama}
                        name="dhuhrIqama"
                        id={`dhuhrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.asr}
                        name="asr"
                        id={`asr${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.asrIqama}
                        name="asrIqama"
                        id={`asrIqama${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.maghrib}
                        name="maghrib"
                        id={`maghrib${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.isha}
                        name="isha"
                        id={`isha${monthDate}`}/>
                </td>
                <td>
                    <InputField
                        onChange={this.onChange}
                        type="time"
                        mode={viewMode}
                        value={prayer.ishaIqama}
                        name="ishaIqama"
                        id={`ishaIqama${monthDate}`}/>
                </td>
            </tr>
        );
    }
}

export default PrayerDay;