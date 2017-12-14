let makeSalahObject = require("./commonUtils").makeSalahObject;
let addDays = require("./date/dateTimeUtils").addDays;

// VERY IMPORTANT: nowTime and salahs dates should have same date
let getCurrentSalahPeriod = (nowTime, salahs) => {
    if (!nowTime || !salahs) {
        return;
    }
    
    let salahPeriod = [];
    
    if (nowTime < salahs[0].azan.getTime()) {
        // current time is before today's fajar azan
        // yesterday isha
        salahPeriod.push(makeSalahObject(salahs[4].name, addDays(salahs[4].azan, -1), addDays(salahs[4].iqmah, -1)));
        salahPeriod.push(salahs[0]);
        //salahPeriod.push(salahs[4]);
        //salahPeriod.push(makeSalahObject(salahs[0].name, addDays(salahs[0].azan, 1), addDays(salahs[0].iqmah, 1)));

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

module.exports = getCurrentSalahPeriod;