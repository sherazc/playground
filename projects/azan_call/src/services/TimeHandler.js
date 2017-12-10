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








