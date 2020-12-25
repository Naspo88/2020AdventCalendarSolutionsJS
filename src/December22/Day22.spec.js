import { solveDayPart1, solveDayPart2 } from './Day22';

const realText = `Player 1:
28
50
9
11
4
45
19
26
42
43
31
46
21
40
33
20
7
6
17
44
5
39
35
27
10

Player 2:
18
16
29
41
14
12
30
37
36
24
48
38
47
34
15
8
49
23
1
3
32
25
22
13
2`;

const part1Text = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const part2Text = `Player 1:
43
19

Player 2:
2
29
14`;



describe("Day22 tests", () => {
    it('solveDayPart1 solution with the 1st fake data is correct', () => {
        expect(solveDayPart1(part1Text)).toBe(306);
    });

    it('solveDayPart1 solution with real data is correct', () => {
        expect(solveDayPart1(realText)).toBe(31629);
    });

    it('solveDayPart2 solution with the 1st fake data is correct', () => {
        expect(solveDayPart2(part1Text)).toBe(291);
    });

    it('solveDayPart2 solution with the 2st fake data is correct', () => {
        expect(solveDayPart2(part2Text)).toBe(105);
    });

    it('solveDayPart2 solution with real data is correct', () => {
        expect(solveDayPart2(realText)).toBe(35196);
    });
});
