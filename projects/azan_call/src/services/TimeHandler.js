import ScreenBuilder, { styles } from "../ui/ScreenBuilder";

let screenBuilder = new ScreenBuilder();

const SALAH_NAMES = ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha"];

export default class TimeHandler {
    constructor(todaySalatTime, mainState, setMainState) {
        let salahs = [
            makeSalahObject(SALAH_NAMES[0], todaySalatTime.fajr_athan, todaySalatTime.fajr_iqama),
            makeSalahObject(SALAH_NAMES[1], todaySalatTime.thuhr_athan,todaySalatTime.thuhr_iqama),
            makeSalahObject(SALAH_NAMES[2], todaySalatTime.asr_athan, todaySalatTime.asr_iqama),
            makeSalahObject(SALAH_NAMES[3], todaySalatTime.maghrib_athan, todaySalatTime.maghrib_iqama),
            makeSalahObject(SALAH_NAMES[4], todaySalatTime.isha_athan, todaySalatTime.isha_iqama)
        ];
        setInterval(() => processSalahTimes.apply(this, [salahs, mainState, setMainState]), 1000);
        // processSalahTimes(salahs, mainState, setMainState);
    }
}

let processSalahTimes = (salahs, mainState, setMainState) => {
    let now = new Date();
    let nowTime = now.getTime();
    let salahPeriod = getCurrentSalahPeriod(nowTime, salahs);
    if (isShowAzanNotCalled(nowTime, salahPeriod, mainState)) {
        setMainState(screenBuilder.buildScreen(mainState.screen, `${salahPeriod[0].name} Azan Not Called`, null, styles.screenRed, null));
        if (mainState.salatDone && salahPeriod[1].azan.getTime() < nowTime) {
            setMainState({salatDone: false});
        }
        setMainState({tappable: true});
    }

    if (isShowAzanCalled(nowTime, salahPeriod, mainState)) {
        setMainState(
            screenBuilder.buildScreen(
                mainState.screen, 
                `${salahPeriod[0].name} Azan Called`, 
                null, styles.screenGreen, 
                `${salahPeriod[0].name} jamat begins in ${salahPeriod[0].iqmah.getTime() - nowTime}`,
                styles.textLight));
        
        setMainState({tappable: true});
    }

    console.log(salahPeriod);
}

let isShowAzanNotCalled = (nowTime, salahPeriod, mainState) => {
    return nowTime > salahPeriod[0].azan.getTime() 
        && nowTime < salahPeriod[1].azan.getTime()
        && !mainState.azanCalled && !mainState.salatDone;
}

let isShowAzanCalled = (nowTime, salahPeriod, mainState) => {
    return nowTime > salahPeriod[0].azan.getTime() 
        && nowTime < salahPeriod[1].azan.getTime()
        && mainState.azanCalled 
        && nowTime < salahPeriod[0].iqmah.getTime();
}


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

Show "Salat in progress" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == true) and (Current_time > Current_Salah.iqama) and (Current_time < Current_Salah.iqama + 20 mins) 

Show "Salat done" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == true) and (Current_time >= Current_Salah.iqama + 20 mins) and set azanCalled = false and set main message = Next_Salah.name + begins in + (Next_Salah.athan - Current_time) set salahDone = true

Show blank screen If Next_Salah.athan - Current_time == 1h, set salahDone = false
*/


let getCurrentSalahPeriod = (nowTime, salahs) => {
    let salahPeriod = [];

    if (nowTime < salahs[0].azan.getTime()) {
        // current time is before today's fajar azan
        // yesterday isha
        salahPeriod.push(makeSalahObject(salahs[4].name, addDays(salahs[4].azan, -1), addDays(salahs[4].iqmah, -1)));
        salahPeriod.push(salahs[0]);
    } else if (nowTime > salahs[4].azan.getTime()) {
        // current time is after today's isha azan
        salahPeriod.push(salahs[4]);
        salahPeriod.push(makeSalahObject(salahs[0].name, addDays(salahs[0].azan, 1), addDays(salahs[0].iqmah, 1)));
    } else {
        // Current time is after today's fajar azan
        for(let currentSalahIndex in salahs) {
            currentSalahIndex = (currentSalahIndex - 0);
            let nextSalahIndex = (currentSalahIndex) + 1;
            if (nextSalahIndex > 4) {
                nextSalahIndex = 0;
            }
            let tempCurrentSalah = salahs[currentSalahIndex];
            let tempNextSalah = salahs[nextSalahIndex];

            if (nowTime > tempCurrentSalah.azan.getTime() 
                && nowTime < tempNextSalah.azan.getTime()) {
                salahPeriod.push(tempCurrentSalah);
                salahPeriod.push(tempNextSalah);
                break;
            }
        }
    }
    return salahPeriod;
}

let addDays = (date, days) => {
    let calculatedDate = new Date(date.valueOf());
    calculatedDate.setDate(date.getDate() + days);
    return calculatedDate;
}

let makeSalahObject = (name, azan, iqmah) => {
    return {name, azan, iqmah};
}; 
