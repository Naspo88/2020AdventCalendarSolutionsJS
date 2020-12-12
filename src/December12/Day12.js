import { returnArrayFromText } from '../utils/helpers';

function getNewDirection (start, dir, degree) {
    const posDir = ['N', 'E', 'S', 'W'];
    const startPos = posDir.indexOf(start);
    const movement = degree / 90;
    let newIndex;

    if (dir === 'L') {
        newIndex = startPos - movement;
        if (newIndex < 0) {
            newIndex = posDir.length + newIndex;
        }
    } else {
        newIndex = startPos + movement;
        if (newIndex >= posDir.length) {
            newIndex = newIndex - posDir.length;
        }
    }

    return posDir[newIndex];
}

function moveShip (ship, dir, value) {
    switch(dir) {
        case 'N':
            ship.N += value;
            break;
        case 'S':
            ship.N -= value;
            break;
        case 'E':
            ship.E += value;
            break
        case 'W':
            ship.E -= value;
            break;
        default:
            break;
    };
    
    return ship;
}

function rotateWayPoint(wayPoint, action, value) {
    const newWayPoint = {};
    Object.keys(wayPoint).forEach(key => {
        const newDirection = getNewDirection(key, action, value);
        newWayPoint[newDirection] = wayPoint[key];
    });
    return newWayPoint;
}

function compassManipulation(compass, dir, opp, value) {
    if (compass[dir] === 0 || compass[dir]) {
        compass[dir] += value;
    }
    if (compass[opp] === 0 || compass[opp]) {
        compass[opp] -= value;
        if (compass[opp] < 0) {
            compass[dir] = Math.abs(compass[opp]);
            delete compass[opp];
        }
    }

    return compass;
}

function getOppositeDirection(dir) {
    if (dir === 'N') return 'S';
    if (dir === 'S') return 'N';
    if (dir === 'E') return 'W';
    if (dir === 'W') return 'E';
    return dir;
}

function moveShip2(position, waypoint, value) {
    Object.keys(waypoint).forEach(key => {
        position = compassManipulation(position, key, getOppositeDirection(key), value * waypoint[key]);
    });
    return position;
}

export function solvePart1 (text) {
    let array = returnArrayFromText(text);
    let shipPosition = {
        E: 0,
        N: 0,
        dir: 'E'
    };

    array.forEach(step => {
        const action = step[0];
        const value = parseInt(step.substring(1));

        switch (action) {
            case 'N':
            case 'S':
            case 'E':
            case 'W':
                shipPosition = moveShip(shipPosition, action, value);
                break;
            case 'L':
            case 'R':
                shipPosition.dir = getNewDirection(shipPosition.dir, action, value);
                break;
            case 'F':
                shipPosition = moveShip(shipPosition, shipPosition.dir, value);
                break;
            default:
                break;
        }
    });

    return Math.abs(shipPosition.E) + Math.abs(shipPosition.N);
}

export function solvePart2 (text) { 
    const array = returnArrayFromText(text);
    let wayPoint = {
        E: 10,
        N: 1
    };
    let shipPosition = {
        E: 0,
        N: 0
    };

    array.forEach(step => {
        const action = step[0];
        const value = parseInt(step.substring(1));

        switch (action) {
            case 'N':
            case 'S':
            case 'E':
            case 'W':
                wayPoint = compassManipulation(wayPoint, action, getOppositeDirection(action), value);
                break;
            case 'L':
            case 'R':
                wayPoint = rotateWayPoint(wayPoint, action, value);
                break;
            case 'F':
                shipPosition = moveShip2(shipPosition, wayPoint, value);
                break;
            default:
                break;
        }
    });
    
    const EW = shipPosition.E ? shipPosition.E : shipPosition.W;
    const NS = shipPosition.N ? shipPosition.N : shipPosition.S;
    return Math.abs(EW) + Math.abs(NS);
}