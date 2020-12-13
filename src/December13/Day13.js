import { returnArrayFromText, numericalOrderSorting } from '../utils/helpers';

function getEarlierBusIdAndTime(busObject) {
    let min = 99999999999999999999999999999;
    let busId = -1;
    Object.keys(busObject).forEach(key => {
        if (busObject[key] <= min) {
            min = busObject[key];
            busId = key;
        }
    });

    return [busId, min];
}

export function solvePart1 (text) {
    const array = returnArrayFromText(text);
    const time = parseInt(array[0]);
    const buses = returnArrayFromText(array[1], ',').filter(x => x !== 'x').map(x => parseInt(x)).sort(numericalOrderSorting);
    const allBusEarlierDeparture = {};

    if (time === 0) {
        return buses[0] * buses[0];
    }

    buses.forEach(busId => {
        let busEarlyDeparture = 0;
        while (busEarlyDeparture <= time) {
            busEarlyDeparture += busId;
            if (busEarlyDeparture >= time) {
                allBusEarlierDeparture[busId] = busEarlyDeparture;
            }
        }
        
    });

    const [id, timeStamp] = getEarlierBusIdAndTime(allBusEarlierDeparture);

    return id * (timeStamp - time);
}

export function solvePart2 (text) { 
    const array = returnArrayFromText(text);
    const [firstBus, ...buses] = returnArrayFromText(array[1], ',').map((x, i) => ([parseInt(x), i])).filter(x => !Number.isNaN(x[0]));

    let multiplier = firstBus[0];
    let i = 0;

    buses.forEach(([bus, busIndex]) => {
        while (true) {
            if ((i + busIndex) % bus === 0) {
                multiplier *= bus;
                break;
            }
            i += multiplier;
        }
    });
    
    return i;
}