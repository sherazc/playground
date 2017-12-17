const getCurrentSalahPeriod = require("./getCurrentSalahPeriod");
const Constants = require("./Constants");
const {isTimeBetweenAzans, msToTime} = require("./date/dateTimeUtils");
let addDays = require("./date/dateTimeUtils").addDays;

const processSalahs = (now, salahs, azanCalledDateTime) => {
    let result = {
        mainMessage: "",
        subMessage: "",
        alert: Constants.ALERT_BLACK
    }
    if (!now || !salahs) {
        return result;
    }

    let salahPeriod = getCurrentSalahPeriod(now, salahs);
    let azanCalled = isAzanCalled(azanCalledDateTime, salahPeriod);
    let salahDone = isSalahDone(now, salahPeriod, azanCalled);
    let salahInProgress = isSalahInProgress(now, salahPeriod, azanCalled);

    if (!azanCalled) {
        result.mainMessage = `${salahPeriod[0].name} azan not called`;
        result.subMessage = `for ${msToTime(now.getTime() - salahPeriod[0].azan.getTime())}`;
        result.alert = Constants.ALERT_RED;
    } else if(azanCalled && !salahDone && !salahInProgress) {
        result.mainMessage = `${salahPeriod[0].name} azan called`;
        result.subMessage = `Salah begins in ${msToTime(salahPeriod[0].iqmah.getTime() - now.getTime())}`;
        result.alert = Constants.ALERT_GREEN;
    } else if (salahInProgress) {
        result.mainMessage = `${salahPeriod[0].name} in progress`;
        result.subMessage = `for ${msToTime(salahPeriod[0].iqmah.getTime() + Constants.SALAH_DURATION_MILLIS - now.getTime())}`;
        result.alert = Constants.ALERT_BLACK;
    } else if (salahDone) {
        result.mainMessage = `Next salah: ${salahPeriod[1].name}`;
        result.subMessage = `In ${msToTime(salahPeriod[1].azan.getTime() - now.getTime())}`;
        result.alert = Constants.ALERT_BLACK;
    }
    return result;
}

let salahPeriodToString = (salahPeriod) => {
    return `Current ${salahPeriod[0].name}: azan: ${salahPeriod[0].azan.toISOString()}, iqamah: ${salahPeriod[0].iqmah.toISOString()}
Next ${salahPeriod[1].name}: azan: ${salahPeriod[1].azan.toISOString()}, iqamah: ${salahPeriod[1].iqmah.toISOString()}`;
}

let isAzanCalled = (azanCalledDateTime, salahPeriod) =>  {
    if (!azanCalledDateTime || !salahPeriod || salahPeriod.length < 2) {
        return false;
    } 
    return isTimeBetweenAzans(azanCalledDateTime.getTime(), salahPeriod);
}

let isSalahInProgress = (now, salahPeriod, azanCalled) => {
    if (!now || !salahPeriod || salahPeriod.length < 2 || !azanCalled) {
        return false;
    }

    let timeSinceIqmah =  now.getTime() - salahPeriod[0].iqmah.getTime();
    return timeSinceIqmah < Constants.SALAH_DURATION_MILLIS && now.getTime() > salahPeriod[0].iqmah.getTime();
}

let isSalahDone = (now, salahPeriod, azanCalled) => {
    if (!now || !salahPeriod || salahPeriod.length < 2 || !azanCalled) {
        return false;
    }
    
    let timeSinceIqmah =  now.getTime() - salahPeriod[0].iqmah.getTime();
    return timeSinceIqmah > Constants.SALAH_DURATION_MILLIS;
}


module.exports = processSalahs;



/*
asr azan not called

asr azan called
salah begins in 9 min and 30 sec

asr salah in progress (stays for 20 min )

Next Salah: Maghrib
Begins in: 2 hours 3 mins
*/



/*
Current_Salah = 
Order all Azan Times [array of 5 times]
Calculate salah_periods [0-1], [1-2], [2-3], [3-4], [4-0]
loop over all salah_periods
If current_time > salah_period.begin and current_time < salah_period.end
Return salah_period.salah

Update Screen
Show "Azan not called" (if Current_time is between Current_Salah.athan and Next_Salah.athan) 
and (azanCalled == false)  and (salahDone == false) 
set salahDone = false if (salahDone == true) and Next_Salah.athan <= Current_time 

Show "Azan called" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) 
and (azanCalled == true) and  (Current_time < Current_Salah.iqama) and 
set sub message = Current_Salah.name + jamat begins in + (Current_Salah.iqama - Current_time)

Show "Salat in progress" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) 
and (azanCalled == true) and (Current_time > Current_Salah.iqama) 
and (Current_time < Current_Salah.iqama + 20 mins) 

Show "Salat done" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) 
and (azanCalled == true) and (Current_time >= Current_Salah.iqama + 20 mins) 
and set azanCalled = false 
and set main message = Next_Salah.name + begins in + (Next_Salah.athan - Current_time) 
and set salahDone = true

Show blank screen If Next_Salah.athan - Current_time == 1h, set salahDone = false
*/
