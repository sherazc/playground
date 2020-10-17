// Deprecated
import Alert from "../ui/Alert";

export default class SalatTime {
    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    reteriveTodaysSchedule(setSalahTimeInView) {
        let errorHandler = (error) => {
            setSalahTimeInView("error");
            console.log(error);
        };
        fetch(this.serviceUrl)
            .then((response) => response.json(), errorHandler)
            .then((todaySalatTime) => {
                let fixedTodaySalatTime = fixDates(todaySalatTime);
                setSalahTimeInView(fixedTodaySalatTime);
            }, errorHandler)
            .catch(errorHandler);
    }
}

