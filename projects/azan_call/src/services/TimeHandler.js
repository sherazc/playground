//import ScreenBuilder, { styles } from "../ui/ScreenBuilder";

//let screenBuilder = new ScreenBuilder();

const SALAH_NAMES = ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha"];

export default class TimeHandler {
    constructor(todaySalatTime, mainState, setMainState) {
        
        this.todaySalatTime = todaySalatTime;
        this.mainState = mainState;
        this.setMainState = setMainState;
        this.init();
        
    }

    init() {
        let salahs = [
            makeSalahObject(SALAH_NAMES[0], this.todaySalatTime.fajr_athan, this.todaySalatTime.fajr_iqama),
            makeSalahObject(SALAH_NAMES[1], this.todaySalatTime.thuhr_athan, this.todaySalatTime.thuhr_iqama),
            makeSalahObject(SALAH_NAMES[2], this.todaySalatTime.asr_athan, this.todaySalatTime.asr_iqama),
            makeSalahObject(SALAH_NAMES[3], this.todaySalatTime.maghrib_athan, this.todaySalatTime.maghrib_iqama),
            makeSalahObject(SALAH_NAMES[4], this.todaySalatTime.isha_athan, this.todaySalatTime.isha_iqama)
        ];
        console.log(salahs);
    }
}


let makeSalahObject = (name, azan, iqmah) => {
    return {name, azan, iqmah};
}; 

/*

Current_Salah = 
Order all Azan Times [array of 5 times]
Calculate salah_periods [0-1], [1-2], [2-3], [3-4], [4-0]
loop over all salah_periods
If current_time > salah_period.begin and current_time < salah_period.end
Return salah_period.salah

*/