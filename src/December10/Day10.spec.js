import { solvePart1, solvePart2 } from './Day10';

const realText = `56
139
42
28
3
87
142
57
147
6
117
95
2
112
107
54
146
104
40
26
136
127
111
47
8
24
13
92
18
130
141
37
81
148
31
62
50
80
91
33
77
1
96
100
9
120
27
97
60
102
25
83
55
118
19
113
49
133
14
119
88
124
110
145
65
21
7
74
72
61
103
20
41
53
32
44
10
34
121
114
67
69
66
82
101
68
84
48
73
17
43
140`;

const part1Text1 = `16
10
15
5
1
11
7
19
6
12
4`;

const part1Text2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;


describe("Day10 tests", () => {
    it('solvePart1 solution with the 1st fake data is correct', () => {
        expect(solvePart1(part1Text1)).toBe(35);
    });

    it('solvePart1 solution with the 2nd fake data is correct', () => {
        expect(solvePart1(part1Text2)).toBe(220);
    });


    it('solvePart1 solution with real data is correct', () => {
        expect(solvePart1(realText)).toBe(1856);
    });

    it('solvePart2 solution with the 1st fake data is correct', () => {
        expect(solvePart2(part1Text1)).toBe(8);
    });

    it('solvePart2 solution with the 2nd fake data is correct', () => {
        expect(solvePart2(part1Text2)).toBe(19208);
    });


    it('solvePart2 solution with real data is correct', () => {
        expect(solvePart2(realText)).toBe(2314037239808);
    });
});
