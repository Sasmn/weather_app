export default function getDayName(locale) {
    var date = new Date();
    return date.toLocaleDateString(locale, { weekday: 'long' });
}