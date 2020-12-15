import { solvePart1, solvePart2 } from './Day15';

const realText = `15,5,1,4,7,0`;

const part1Text = `0,3,6`;

const part1Text2 = `1,3,2`;

const part1Text3 = `2,1,3`;

const part1Text4 = `1,2,3`;

const part1Text5 = `2,3,1`;

const part1Text6 = `3,2,1`;

const part1Text7 = `3,1,2`;

describe("Day15 tests", () => {
    it('solvePart1 solution with the 1st fake data is correct', () => {
        expect(solvePart1(part1Text, 2020)).toBe(436);
    });

    it('solvePart1 solution with the 2nd fake data is correct', () => {
        expect(solvePart1(part1Text2, 2020)).toBe(1);
    });

    it('solvePart1 solution with the 3rd fake data is correct', () => {
        expect(solvePart1(part1Text3, 2020)).toBe(10);
    });

    it('solvePart1 solution with the 4th fake data is correct', () => {
        expect(solvePart1(part1Text4, 2020)).toBe(27);
    });

    it('solvePart1 solution with the 5th fake data is correct', () => {
        expect(solvePart1(part1Text5, 2020)).toBe(78);
    });

    it('solvePart1 solution with the 6th fake data is correct', () => {
        expect(solvePart1(part1Text6, 2020)).toBe(438);
    });

    it('solvePart1 solution with the 7th fake data is correct', () => {
        expect(solvePart1(part1Text7, 2020)).toBe(1836);
    });

    it('solvePart1 solution with real data is correct', () => {
        expect(solvePart1(realText, 2020)).toBe(1259);
    });

    // it('solvePart2 solution with the 1st fake data is correct', () => {
    //     expect(solvePart1(part1Text, 30000000)).toBe(175594);
    // });

    // it('solvePart2 solution with the 2nd fake data is correct', () => {
    //     expect(solvePart1(part1Text2, 30000000)).toBe(2578);
    // });

    // it('solvePart2 solution with the 3rd fake data is correct', () => {
    //     expect(solvePart1(part1Text3, 30000000)).toBe(3544142);
    // });

    // it('solvePart2 solution with the 4th fake data is correct', () => {
    //     expect(solvePart1(part1Text4, 30000000)).toBe(261214);
    // });

    // it('solvePart2 solution with the 5th fake data is correct', () => {
    //     expect(solvePart1(part1Text5, 30000000)).toBe(6895259);
    // });

    // it('solvePart2 solution with the 6th fake data is correct', () => {
    //     expect(solvePart1(part1Text6, 30000000)).toBe(18);
    // });

    // it('solvePart2 solution with the 7th fake data is correct', () => {
    //     expect(solvePart1(part1Text7, 30000000)).toBe(362);
    // });

    // it('solvePart2 solution with real data is correct', () => {
    //     expect(solvePart1(realText, 30000000)).toBe(689);
    // });
}); // Test for 30000000 commented out because they took >30s to run
