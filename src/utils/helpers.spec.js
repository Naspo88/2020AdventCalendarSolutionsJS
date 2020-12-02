import { returnArrayFromText } from './helpers';
const testText = `string1
string2`;

describe("returnArrayFromText", () => {
    it('returnArrayFromText return an empty array for empty strings', () => {
        expect(returnArrayFromText('')).toEqual([]);
    });

    it('returnArrayFromText return an array of string', () => {
        expect(returnArrayFromText(testText)).toEqual(['string1', 'string2']);
    });

    it('returnArrayFromText return an array of string when splitted for a different value', () => {
        expect(returnArrayFromText('string1-string2', '-')).toEqual(['string1', 'string2']);
    });
});
