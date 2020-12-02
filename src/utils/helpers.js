export function returnArrayFromText (simpleText, splitFor = '\n') {
    if (!simpleText) {
        return [];
    }
    return simpleText.split(splitFor);
}
