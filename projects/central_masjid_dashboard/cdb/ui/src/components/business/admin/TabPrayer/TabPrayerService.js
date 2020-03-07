import {addDaysToDate, datesMonthDatePart} from "../../../../services/utilities";

export default class TabPrayerService {

    createInitialState() {
        return {prayerConfig: {}, prayerConfigDirty: false}
    }

    prayerReducer(prayersMonths, prayer) {
        const prayerDate = new Date(prayer.date);
        const monthIndex = prayerDate.getUTCMonth();
        if (!prayersMonths[monthIndex]) {
            prayersMonths[monthIndex] = [];
        }
        prayersMonths[monthIndex].push(prayer);
        return prayersMonths;
    }

    collectPrayersFromDom() {
        const prayers = [];
        const date = new Date("2016-01-01T00:00:00.000Z");
        for (let i = 0; i < 366; i++) {
            const monthDateKabab = datesMonthDatePart(date);
            const prayer = {
                date: date.toISOString(),
                fajr: this.getDocumentElementValue(`fajr${monthDateKabab}`),
                fajrIqama: this.getDocumentElementValue(`fajrIqama${monthDateKabab}`),
                dhuhr: this.getDocumentElementValue(`dhuhr${monthDateKabab}`),
                dhuhrIqama: this.getDocumentElementValue(`dhuhrIqama${monthDateKabab}`),
                asr: this.getDocumentElementValue(`asr${monthDateKabab}`),
                asrIqama: this.getDocumentElementValue(`asrIqama${monthDateKabab}`),
                maghrib: this.getDocumentElementValue(`maghrib${monthDateKabab}`),
                maghribIqama: this.getDocumentElementValue(`maghribIqama${monthDateKabab}`),
                isha: this.getDocumentElementValue(`isha${monthDateKabab}`),
                ishaIqama: this.getDocumentElementValue(`ishaIqama${monthDateKabab}`),
                sunrise: this.getDocumentElementValue(`sunrise${monthDateKabab}`)
            };
            prayers.push(prayer);
            addDaysToDate(date, 1);
        }
        return prayers;
    }

    getDocumentElementValue(elementId) {
        if (!elementId) {
            return "";
        }
        const element = document.getElementById(elementId);
        if (!element || !element.value) {
            return "";
        } else {
            return element.value;
        }
    }
}