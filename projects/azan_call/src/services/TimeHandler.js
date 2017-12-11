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
