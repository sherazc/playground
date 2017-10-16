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

    reteriveTodaysSchedule() {
        fetch('http://dashboard.masjidhamzah.com/salat_time.php')
            .then((response) => response.json())
            .then((todaySalatTime) => {
                todaySalatTime.fajr_athan = new Date("2017-10-17 17:30:00");
                console.log(todaySalatTime);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}