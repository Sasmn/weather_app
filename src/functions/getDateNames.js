export function getDayName(date, locale) {
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

export function getMonthName(date, locale){
    return date.toLocaleDateString(locale, { month: 'long' });
}