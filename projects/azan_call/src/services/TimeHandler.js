import ScreenBuilder, { styles } from "../ui/ScreenBuilder";

let screenBuilder = new ScreenBuilder();

const SALAH_NAMES = ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha"];

export default class TimeHandler {
    constructor(todaySalatTime, getMainState, setMainState) {
        let salahs = [
            makeSalahObject(SALAH_NAMES[0], todaySalatTime.fajr_athan, todaySalatTime.fajr_iqama),
            makeSalahObject(SALAH_NAMES[1], todaySalatTime.thuhr_athan,todaySalatTime.thuhr_iqama),
            makeSalahObject(SALAH_NAMES[2], todaySalatTime.asr_athan, todaySalatTime.asr_iqama),
            makeSalahObject(SALAH_NAMES[3], todaySalatTime.maghrib_athan, todaySalatTime.maghrib_iqama),
            makeSalahObject(SALAH_NAMES[4], todaySalatTime.isha_athan, todaySalatTime.isha_iqama)
        ];
        // TODO: break interval on refreash time and then re-run it with freash salahs
        setInterval(() => processSalahTimes.apply(this, [salahs, getMainState, setMainState]), 1000);

        // processSalahTimes(salahs, mainState, setMainState);
    }
}

let processSalahTimes = (salahs, getMainState, setMainState) => {
    let now = new Date();
    let nowTime = now.getTime();
    let salahPeriod = getCurrentSalahPeriod(nowTime, salahs);
    setMainState({tappable: true});
    
    if (isShowAzanNotCalled(nowTime, salahPeriod, getMainState)) {
        setMainState(screenBuilder.buildScreen(
            getMainState().screen, 
            `${salahPeriod[0].name} Azan Not Called`, 
            null, styles.screenRed, 
            null
        ));

        if (getMainState().salatDone && salahPeriod[1].azan.getTime() < nowTime) {
            setMainState({salatDone: false});
        }
        setMainState({tappable: true});
    }


    
    if (isShowAzanCalled(nowTime, salahPeriod, getMainState)) {
        setMainState(screenBuilder.buildScreen(
            getMainState().screen, 
            `${salahPeriod[0].name} Azan Called`, 
            `${salahPeriod[0].name} jamat begins in ${msToTime(salahPeriod[0].iqmah.getTime() - nowTime)}`,
            styles.screenGreen, styles.textExtraLargeLight, styles.textLight
        ));
        setMainState({tappable: true});
    }
/*
    if (isShowSalahInProgress(nowTime, salahPeriod, getMainState)) {
        setMainState(screenBuilder.buildScreen(        
            getMainState().screen, 
            `${salahPeriod[0].name} Salah in progress`, 
            null, styles.screenGreen, null, styles.textLight
        ));
        setMainState({tappable: false});
    }

    if (isShowSalahDone(nowTime, salahPeriod, getMainState)) {
        setMainState(screenBuilder.buildScreen(
            getMainState().screen, 
            `${salahPeriod[1].name} begins in ${msToTime(salahPeriod[1].azan.getTime() - nowTime)}`, 
            null, 
            styles.screenGreen, null, styles.textLight
        ));
        setMainState({
            tappable: false, 
            azanCalled: false,
            salatDone: true
        });
    }

    if (isShowBlankScreen(nowTime, salahPeriod, getMainState)) {
        setMainState(screenBuilder.buildScreen(
            getMainState().screen, 
            `${salahPeriod[0].name} Blank Screen`, 
            null, 
            styles.screenGreen, null, styles.textLight
        ));
        setMainState({tappable: false, salatDone: false});
    }
*/
}

let isShowAzanNotCalled = (nowTime, salahPeriod, getMainState) => {
    return isTimeBetweenAzans(nowTime, salahPeriod) 
        && !getMainState().azanCalled && !getMainState().salatDone;
}

let isShowAzanCalled = (nowTime, salahPeriod, getMainState) => {
    return isTimeBetweenAzans(nowTime, salahPeriod) 
        && getMainState().azanCalled 
        && nowTime < salahPeriod[0].iqmah.getTime();
}

let isShowSalahInProgress = (nowTime, salahPeriod, getMainState) => {
    return isTimeBetweenAzans(nowTime, salahPeriod) 
        && getMainState().azanCalled 
        && nowTime > salahPeriod[0].iqmah.getTime()
        && nowTime < (salahPeriod[0].iqmah.getTime() + addMinutes(salahPeriod[0].iqmah, 20));
}

let isShowSalahDone = (nowTime, salahPeriod, getMainState) => {
    return isTimeBetweenAzans(nowTime, salahPeriod) 
        && getMainState().azanCalled 
        && nowTime > (salahPeriod[0].iqmah.getTime() + addMinutes(salahPeriod[0].iqmah, 20));
}

let isShowBlankScreen = (nowTime, salahPeriod, getMainState) => {
    return salahPeriod[1].azan.getTime() - nowTime > (1000 * 60 * 60);
}

/*
Show blank screen If Next_Salah.athan - Current_time == 1h, set salahDone = false
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






