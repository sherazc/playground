import Alert from "../ui/Alert";

export default class SalatTime {
    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
        let todaySalatTime = { 
            "id": "287", 
            "prayer_date": "2013-10-14", 
            "fajr_athan": "0000-00-00 06:33:00", 
            "fajr_iqama": "0000-00-00 06:50:00", 
            "thuhr_athan": "0000-00-00 13:24:00", 
            "thuhr_iqama": "0000-00-00 14:00:00", 
            "asr_athan": "0000-00-00 16:38:00", 
            "asr_iqama": "0000-00-00 17:45:00", 
            "maghrib_athan": "0000-00-00 19:06:00", 
            "maghrib_iqama": "5 Min", 
            "isha_athan": "0000-00-00 20:15:00", 
            "isha_iqama": "0000-00-00 20:45:00", 
            "shurooq": "0000-00-00 07:40:00", 
            "maghrib_change": "0000-00-00 19:05:00", 
            "maghrib_change_date": "2017-10-15", 
            "asr_change": "0000-00-00 17:30:00", 
            "asr_change_date": "2017-10-17", 
            "isha_change": "0000-00-00 20:30:00", 
            "isha_change_date": "2017-10-17", 
            "fajr_change": "0000-00-00 07:00:00", 
            "fajr_change_date": "2017-10-20" 
        }
    }
/*
0000-00-00 07:00:00
*/
    reteriveTodaysSchedule() {
        fetch('http://dashboard.masjidhamzah.com/salat_time.php')
            .then((response) => response.json())
            .then((todaySalatTime) => {
                let fixedTodaySalatTime = fixDates(todaySalatTime);
                
            })
            .catch((error) => {
                console.error(error);
            });
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

    console.log(todaySalatTime);
    Alert.show("Time", JSON.stringify(todaySalatTime));
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