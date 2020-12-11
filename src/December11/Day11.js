import { returnArrayFromText, setCharAt } from '../utils/helpers';

const countOccupiedPlaces = (input) => {
    let count = 0;
    input.forEach(row => {
        const inRow = (row.match(/#/g) || []).length;
        count += inRow;
    });
    return count;
}

function getAdjacentSeats (i, j, input) {
    let seats = [];
    if(i - 1 !== -1 && j - 1 !== -1) seats.push([i - 1, j - 1]);
    if(i - 1 !== -1) seats.push([i - 1, j]);
    if(i - 1 !== -1 && j + 1 < input[0].length) seats.push([i - 1, j + 1]);
    if(j + 1 < input[0].length) seats.push([i, j + 1]);
    if(i + 1 < input.length && j + 1 < input[0].length) seats.push([i + 1, j + 1]);
    if(i + 1 < input.length) seats.push([i + 1, j]);
    if(i + 1 < input.length && j - 1 !== -1) seats.push([i + 1, j - 1]);
    if(j - 1 !== -1) seats.push([i, j - 1]);
    return seats;
}

function getVisibleSeats (i, j, input) {
    let seats = [];
    if(i - 1 !== -1 && j - 1 !== -1) {
        if(input[i - 1][j - 1] === ".") {
            let seat = [i - 1, j - 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]--;
                seat[1]--;
                if(seat[0] === -1 || seat[1] === -1) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i - 1, j - 1]);
        }
    }
    if(i - 1 !== -1) {
        if(input[i - 1][j] === ".") {
            let seat = [i - 1, j];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]--;
                if(seat[0] === -1) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i - 1, j]);
        }
    }
    if(i - 1 !== -1 && j + 1 < input[0].length) {
        if(input[i - 1][j + 1] === ".") {
            let seat = [i - 1, j + 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]--;
                seat[1]++;
                if(seat[0] === -1 || seat[1] >= input[0].length) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i - 1, j + 1]);
        }
    }
    if(j + 1 < input[0].length) {
        if(input[i][j + 1] === ".") {
            let seat = [i, j + 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[1]++;
                if(seat[1] >= input[0].length) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i, j + 1]);
        }
    }
    if(i + 1 < input.length && j + 1 < input[0].length) {
        if(input[i + 1][j + 1] === ".") {
            let seat = [i + 1, j + 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]++;
                seat[1]++;
                if(seat[0] >= input.length || seat[1] >= input[0].length) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i + 1, j + 1]);
        }
    }
    if(i + 1 < input.length) {
        if(input[i + 1][j] === ".") {
            let seat = [i + 1, j];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]++;
                if(seat[0] >= input.length) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i + 1, j]);
        }
    }
    if(i + 1 < input.length && j - 1 !== -1) {
        if(input[i + 1][j - 1] === ".") {
            let seat = [i + 1, j - 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[0]++;
                seat[1]--;
                if(seat[0] >= input.length || seat[1] === -1) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i + 1, j - 1]);
        }
    }
    if(j - 1 !== -1) {
        if(input[i][j - 1] === ".") {
            let seat = [i, j - 1];
            let push = true;
            while(input[seat[0]][seat[1]] === ".") {
                seat[1]--;
                if(seat[1] === -1) {
                    push = false;
                    break;
                }
            }
            if(push) seats.push(seat);
        } else {
            seats.push([i, j - 1]);
        }
    }
    return seats;
}

export function solvePart1 (text) {
    let startArray = returnArrayFromText(text);
    let hadChanges = true;

    while (hadChanges) {
        hadChanges = false;
        const endArray = [...startArray];
        for(let i = 0; i < startArray.length; i++) {
            for(let j = 0; j < startArray[i].length; j++) {
                let occupiedCount = 0;
                for(const seat of getAdjacentSeats(i, j, startArray)) {
                    if(startArray[seat[0]][seat[1]] === '#') {
                        occupiedCount++;
                    }
                }
                if(startArray[i][j] === 'L' && occupiedCount === 0) {
                    endArray[i] = setCharAt(endArray[i], j, '#');
                    hadChanges = true;
                } else if (startArray[i][j] === '#' && occupiedCount >= 4) {
                    endArray[i] = setCharAt(endArray[i], j, 'L');
                    hadChanges = true;
                }
            }
        }

        startArray = endArray;
    }

    return countOccupiedPlaces(startArray);
}

export function solvePart2 (text) { 
    let startArray = returnArrayFromText(text);
    let hadChanges = true;

    while (hadChanges) {
        hadChanges = false;
        const endArray = [...startArray];
        for(let i = 0; i < startArray.length; i++) {
            for(let j = 0; j < startArray[i].length; j++) {
                let occupiedCount = 0;
                for(const seat of getVisibleSeats(i, j, startArray)) {
                    if(startArray[seat[0]][seat[1]] === '#') {
                        occupiedCount++;
                    }
                }
                if(startArray[i][j] === 'L' && occupiedCount === 0) {
                    endArray[i] = setCharAt(endArray[i], j, '#');
                    hadChanges = true;
                } else if (startArray[i][j] === '#' && occupiedCount >= 5) {
                    endArray[i] = setCharAt(endArray[i], j, 'L');
                    hadChanges = true;
                }
            }
        }

        startArray = endArray;
    }

    return countOccupiedPlaces(startArray);
}