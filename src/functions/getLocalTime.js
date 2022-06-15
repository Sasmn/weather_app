export default function convertDateToUTC(date, timezone) {
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    const localDate = new Date(utcDate.getTime() + timezone * 1000)
    return localDate;
}