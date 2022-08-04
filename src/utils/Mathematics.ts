export function RoundNumber(num: number, length: number) {
    return Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
}
