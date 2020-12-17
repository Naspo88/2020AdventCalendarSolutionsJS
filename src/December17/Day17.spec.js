import { solveDay } from './Day17';

const realText = `#.##....
.#.#.##.
###.....
....##.#
#....###
.#.#.#..
.##...##
#..#.###`;

const part1Text = `.#.
..#
###`;

describe("Day17 tests", () => {
    it('solvePart1 solution with the 1st fake data is correct', () => {
        expect(solveDay(part1Text)).toBe(112);
    });

    it('solvePart1 solution with real data is correct', () => {
        expect(solveDay(realText)).toBe(230);
    });

    it('solvePart2 solution with the 1st fake data is correct', () => {
        expect(solveDay(part1Text, true)).toBe(848);
    });

    it('solvePart2 solution with real data is correct', () => {
        expect(solveDay(realText, true)).toBe(1600);
    });
});
