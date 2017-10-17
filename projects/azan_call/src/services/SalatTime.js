import Alert from "../ui/Alert";

export default class SalatTime {
    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    reteriveTodaysSchedule(setSalahTimeInView) {
        let errorHandler = (error) => setSalahTimeInView("error");
        fetch(this.serviceUrl)
            .then((response) => response.json(), errorHandler)
            .then((todaySalatTime) => {
                let fixedTodaySalatTime = fixDates(todaySalatTime);
                setSalahTimeInView(fixedTodaySalatTime);
            }, errorHandler)
            .catch(errorHandler);
    }
}

let fixDates = (todaySalatTime) => {
    todaySalatTime.fajr_athan = stringToDate(todaySalatTime.fajr_athan);
    todaySalatTime.fajr_iqama = stringToDate(todaySalatTime.fajr_iqama);
    todaySalatTime.thuhr_athan = stringToDate(todaySalatTime.thuhr_athan);
    todaySalatTime.thuhr_iqama = stringToDate(todaySalatTime.thuhr_iqama);
    todaySalatTime.asr_athan = stringToDate(todaySalatTime.asr_athan);
    todaySalatTime.asr_iqama = stringToDate(todaySalatTime.asr_iqama);
    todaySalatTime.maghrib_athan = stringToDate(todaySalatTime.maghrib_athan);
    
    if (todaySalatTime.maghrib_athan) {
        let maghrib_iqama = new Date(todaySalatTime.maghrib_athan);
        maghrib_iqama.setMinutes(maghrib_iqama.getMinutes() + 5);
        todaySalatTime.maghrib_iqama = maghrib_iqama;
    } else {
        todaySalatTime.maghrib_iqama = null;    
    }
    todaySalatTime.isha_athan = stringToDate(todaySalatTime.isha_athan);
    todaySalatTime.isha_iqama = stringToDate(todaySalatTime.isha_iqama);
    return todaySalatTime;
}

let stringToDate = (dateString) => {
    if (!dateString || dateString.length < 19) {
        return null;
    }
    let now = new Date();
    let year = now.getFullYear();
    let month = oneToTwoDigitsString(now.getMonth() + 1);
    let date = oneToTwoDigitsString(now.getDate());
    return new Date(`${year}-${month}-${date}T${dateString.substr(11, 19)}`);
}

let oneToTwoDigitsString = (num) => {
    let numString = "" + num;
    if (numString.length < 2) {
        return "0" + num;
    } else {
        return numString;
    }
}