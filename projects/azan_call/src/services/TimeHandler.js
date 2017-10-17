import ScreenBuilder, {styles} from "../ui/ScreenBuilder";

let screenBuilder = new ScreenBuilder();

export default class TimeHandler {
    constructor(todaySalatTime, mainState, setMainState) {
        this.todaySalatTime = todaySalatTime;
        this.mainState = mainState;
        this.setMainState = setMainState;
    }
}

/*

Current_Salah = 
Order all Azan Times [array of 5 times]
Calculate salah_periods [0-1], [1-2], [2-3], [3-4], [4-0]
loop over all salah_periods
If current_time > salah_period.begin and current_time < salah_period.end
Return salah_period.salah

*/