//import ScreenBuilder, { styles } from "../ui/ScreenBuilder";

//let screenBuilder = new ScreenBuilder();

const SALAH_NAMES = ["Fajar", "Zuhar", "Asr", "Maghrib", "Isha"];

export default class TimeHandler {
    constructor(todaySalatTime, mainState, setMainState) {
        this.todaySalatTime = todaySalatTime;
        this.mainState = mainState;
        this.setMainState = setMainState;
        this.init();
        setInterval(() => processSalahTimes.apply(this, [this.salahs]), 1000);
    }

    init() {
        let salahs = [
            makeSalahObject(SALAH_NAMES[0], this.todaySalatTime.fajr_athan, this.todaySalatTime.fajr_iqama),
            makeSalahObject(SALAH_NAMES[1], this.todaySalatTime.thuhr_athan, this.todaySalatTime.thuhr_iqama),
            makeSalahObject(SALAH_NAMES[2], this.todaySalatTime.asr_athan, this.todaySalatTime.asr_iqama),
            makeSalahObject(SALAH_NAMES[3], this.todaySalatTime.maghrib_athan, this.todaySalatTime.maghrib_iqama),
            makeSalahObject(SALAH_NAMES[4], this.todaySalatTime.isha_athan, this.todaySalatTime.isha_iqama)
        ];
        this.salahs = salahs;
    }
}

let processSalahTimes = (salahs) => {
    console.log("Why ", salahs[0].azan.getTime());
    let now = new Date();
    let nowTime = now.getTime();


}

/*

Current_Salah = 
Order all Azan Times [array of 5 times]
Calculate salah_periods [0-1], [1-2], [2-3], [3-4], [4-0]
loop over all salah_periods
If current_time > salah_period.begin and current_time < salah_period.end
Return salah_period.salah



Update Screen
Show "Azan not called" (if Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == false)  and (salahDone == false) 
set salahDone = false if (salahDone == true) and Next_Salah.athan <= Current_time 

Show "Azan called" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == true) and  (Current_time < Current_Salah.iqama) and set sub message = Current_Salah.name + jamat begins in + (Current_Salah.iqama - Current_time)

Show "Salat in progress" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == true) and (Current_time > Current_Salah.iqama) and (Current_time < Current_Salah.iqama + 20 mins) 

Show "Salat done" (if  Current_time is between Current_Salah.athan and Next_Salah.athan) and (azanCalled == true) and (Current_time >= Current_Salah.iqama + 20 mins) and set azanCalled = false and set main message = Next_Salah.name + begins in + (Next_Salah.athan - Current_time) set salahDone = true

Show blank screen If Next_Salah.athan - Current_time == 1h, set salahDone = false






*/

let makeSalahObject = (name, azan, iqmah) => {
    return {name, azan, iqmah};
}; 

