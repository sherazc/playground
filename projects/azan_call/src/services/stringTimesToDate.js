
module.exports = (salatTime) => {
    if (!salatTime) {
        return;
    }
    salatTime.fajr_athan = stringToDate(salatTime.fajr_athan);
    salatTime.fajr_iqama = stringToDate(salatTime.fajr_iqama);
    salatTime.thuhr_athan = stringToDate(salatTime.thuhr_athan);
    salatTime.thuhr_iqama = stringToDate(salatTime.thuhr_iqama);
    salatTime.asr_athan = stringToDate(salatTime.asr_athan);
    salatTime.asr_iqama = stringToDate(salatTime.asr_iqama);
    salatTime.maghrib_athan = stringToDate(salatTime.maghrib_athan);
    
    if (salatTime.maghrib_athan) {
        let maghrib_iqama = new Date(salatTime.maghrib_athan);
        maghrib_iqama.setMinutes(maghrib_iqama.getMinutes() + 5);
        salatTime.maghrib_iqama = maghrib_iqama;
    } else {
        salatTime.maghrib_iqama = undefined;    
    }
    salatTime.isha_athan = stringToDate(salatTime.isha_athan);
    salatTime.isha_iqama = stringToDate(salatTime.isha_iqama);
    return salatTime;
}

let stringToDate = (dateString) => {
    if (!dateString || dateString.length < 19) {
        return;
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