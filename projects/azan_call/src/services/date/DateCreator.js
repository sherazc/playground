let now = () => {
    let systemNow = new Date();
    let utcMillis = Date.UTC(
        systemNow.getFullYear(), 
        systemNow.getMonth(), 
        systemNow.getDate(), 
        systemNow.getHours(), 
        systemNow.getMinutes(), 
        systemNow.getSeconds(), 
        systemNow.getMilliseconds());
    return new Date(utcMillis);
};

let fromISO = (isoDateString) => {
    if(!isoDateString || isoDateString.length < 4) {
        return;
    }
   
    let year = subStringToNumber(isoDateString, 0, 4);
    let month = subStringToNumber(isoDateString, 5, 7);
    let date = subStringToNumber(isoDateString, 8, 10);
    let hours = subStringToNumber(isoDateString, 11, 13);
    let minutes = subStringToNumber(isoDateString, 14, 16);
    let seconds = subStringToNumber(isoDateString, 17, 19);
    let milliseconds = subStringToNumber(isoDateString, 20, 23);

    if (
        year > 1899 && year < 3000 
        && month > 0 && month < 13
        && date > 0 && date < 32
        && hours > -1 && hours < 24
        && minutes > -1 && minutes < 60
        && seconds > -1 && seconds < 60
        ) {
        return new Date(Date.UTC(year, --month, date, hours, minutes, seconds, milliseconds));
    }
};

let subStringToNumber = (stringInput, fromIndex, toIndex) => {
    let subStringResult = stringInput.substring(fromIndex, toIndex);
    let numberResult = parseInt(subStringResult);
    if (numberResult) {
        return numberResult;
    } else {
        return 0;
    }
};

module.exports = {
    now, fromISO
};