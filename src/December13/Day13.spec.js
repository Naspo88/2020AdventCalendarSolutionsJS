import { solvePart1, solvePart2 } from './Day13';

const realText = `1000104
41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,659,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,937,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17`;

const part1Text = `939
7,13,x,x,59,x,31,19`;

const part1Text2 = `1
17,x,13,19`;

const part1Text3 = `1
67,7,59,61`;

const part1Text4 = `1
67,x,7,59,61`;

const part1Text5 = `1
67,7,x,59,61`;

const part1Text6 = `1
1789,37,47,1889`;

describe("Day13 tests", () => {
    it('solvePart1 solution with the 1st fake data is correct', () => {
        expect(solvePart1(part1Text)).toBe(295);
    });

    it('solvePart1 solution with real data is correct', () => {
        expect(solvePart1(realText)).toBe(115);
    });

    it('solvePart2 solution with the 1st fake data is correct', () => {
        expect(solvePart2(part1Text)).toBe(1068781);
    });

    it('solvePart2 solution with the 2nd fake data is correct', () => {
        expect(solvePart2(part1Text2)).toBe(3417);
    });

    it('solvePart2 solution with the 3rd fake data is correct', () => {
        expect(solvePart2(part1Text3)).toBe(754018);
    });

    it('solvePart2 solution with the 4th fake data is correct', () => {
        expect(solvePart2(part1Text4)).toBe(779210);
    });

    it('solvePart2 solution with the 5th fake data is correct', () => {
        expect(solvePart2(part1Text5)).toBe(1261476);
    });

    it('solvePart2 solution with the 6th fake data is correct', () => {
        expect(solvePart2(part1Text6)).toBe(1202161486);
    });

    it('solvePart2 solution with real data is correct', () => {
        expect(solvePart2(realText)).toBe(756261495958122);
    });
});
