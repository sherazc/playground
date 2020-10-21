import { Prayer, TodaysDetailMessage } from "../types/types";

export const processPrayerMessage = (prayer: Prayer): TodaysDetailMessage => {
    const result: TodaysDetailMessage = {
        currentPrayer: "",
        currentJamat: "",
        nextPrayer: ""
    };

    const now = new Date();
    
    return result;
}
