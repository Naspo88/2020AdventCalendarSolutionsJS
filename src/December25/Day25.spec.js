import { solveDayPart1 } from './Day25';

const realText = `8458505
16050997`;

const part1Text = `5764801
17807724`;

describe("Day25 tests", () => {
    it('solveDayPart1 solution with the 1st fake data is correct', () => {
        expect(solveDayPart1(part1Text)).toBe(14897079);
    });

    it('solveDayPart1 solution with real data is correct', () => {
        expect(solveDayPart1(realText)).toBe(448851);
    });
});
