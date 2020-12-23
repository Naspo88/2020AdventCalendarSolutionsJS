import { solveDayPart1, solveDayPart2 } from './Day23';

const realText = `487912365`;

const part1Text = `389125467`;

describe("Day23 tests", () => {
    it('solveDayPart1 solution with the 1st fake data and 10 moves is correct', () => {
        expect(solveDayPart1(part1Text, 10)).toBe('92658374');
    });

    it('solveDayPart1 solution with the 1st fake data and 100 moves is correct', () => {
        expect(solveDayPart1(part1Text, 100)).toBe('67384529');
    });

    it('solveDayPart1 solution with real data is correct', () => {
        expect(solveDayPart1(realText, 100)).toBe('89573246');
    });

    it('solveDayPart2 solution with the 1st fake data and 10000000 moves is correct', () => {
        expect(solveDayPart2(part1Text, 10000000)).toBe(149245887792);
    });

    it('solveDayPart2 solution with real data is correct', () => {
        expect(solveDayPart2(realText, 10000000)).toBe(2029056128);
    });
});
