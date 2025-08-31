export function checkString(str: string, maxLength: number = 150) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    }
    return str;
}
