const getCurrentSalahPeriod = require("./getCurrentSalahPeriod");
const Constants = require("./Constants");
const {isTimeBetweenAzans, msToTime} = require("./date/dateTimeUtils");
let addDays = require("./date/dateTimeUtils").addDays;

const processSalahs = (now, salahs, azanCalledDateTime) => {
    let result = {
        mainMessage: "",
        subMessage: "",
        alert: Constants.ALERT_BLACK,
        azanSalahStatus: Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED
    };

    if (!now || !salahs) {
        return result;
    }

    let salahPeriod = getCurrentSalahPeriod(now, salahs);
    let azanCalled = isAzanCalled(azanCalledDateTime, salahPeriod);
    let salahDone = isSalahDone(now, salahPeriod, azanCalled);
    let salahInProgress = isSalahInProgress(now, salahPeriod, azanCalled);

    if (!azanCalled) { // Azan not called
        result.mainMessage = `${salahPeriod[0].name} azan not called`;
        result.subMessage = `for ${msToTime(now.getTime() - salahPeriod[0].azan.getTime())}`;
        result.alert = Constants.ALERT_RED;
        result.azanSalahStatus = Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED;
    } else if(azanCalled && !salahDone && !salahInProgress) { // Azan called
        result.mainMessage = `${salahPeriod[0].name} azan called`;
        result.subMessage = `Salah begins in ${msToTime(salahPeriod[0].iqmah.getTime() - now.getTime())}`;
        result.alert = Constants.ALERT_GREEN;
        result.azanSalahStatus = Constants.AZAN_SALAH_STATUS.AZAN_CALLED;
    } else if (salahInProgress) { // Salah in progress
        result.mainMessage = `${salahPeriod[0].name} in progress`;
        result.subMessage = `for ${msToTime(salahPeriod[0].iqmah.getTime() + Constants.SALAH_DURATION_MILLIS - now.getTime())}`;
        result.alert = Constants.ALERT_BLACK;
        result.azanSalahStatus = Constants.AZAN_SALAH_STATUS.SALAH_IN_PROGRESS;
    } else if (salahDone) { // Salah done
        result.mainMessage = `Next salah: ${salahPeriod[1].name}`;
        result.subMessage = `In ${msToTime(salahPeriod[1].azan.getTime() - now.getTime())}`;
        result.alert = Constants.ALERT_BLACK;
        result.azanSalahStatus = Constants.AZAN_SALAH_STATUS.SALAH_DONE;
    }
    return result;
};

let salahPeriodToString = (salahPeriod) => {
    return `Current ${salahPeriod[0].name}: azan: ${salahPeriod[0].azan.toISOString()}, iqamah: ${salahPeriod[0].iqmah.toISOString()}
Next ${salahPeriod[1].name}: azan: ${salahPeriod[1].azan.toISOString()}, iqamah: ${salahPeriod[1].iqmah.toISOString()}`;
};

let isAzanCalled = (azanCalledDateTime, salahPeriod) =>  {
    if (!azanCalledDateTime || !salahPeriod || salahPeriod.length < 2) {
        return false;
    } 
    return isTimeBetweenAzans(azanCalledDateTime.getTime(), salahPeriod);
};

let isSalahInProgress = (now, salahPeriod, azanCalled) => {
    if (!now || !salahPeriod || salahPeriod.length < 2 || !azanCalled) {
        return false;
    }

    let timeSinceIqmah =  now.getTime() - salahPeriod[0].iqmah.getTime();
    return timeSinceIqmah < Constants.SALAH_DURATION_MILLIS && now.getTime() > salahPeriod[0].iqmah.getTime();
};

let isSalahDone = (now, salahPeriod, azanCalled) => {
    if (!now || !salahPeriod || salahPeriod.length < 2 || !azanCalled) {
        return false;
    }
    
    let timeSinceIqmah =  now.getTime() - salahPeriod[0].iqmah.getTime();
    return timeSinceIqmah > Constants.SALAH_DURATION_MILLIS;
};


module.exports = processSalahs;