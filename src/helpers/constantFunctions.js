export function emptyFields(fields) {
    for (let field in fields) {
        if (!fields[field]) {
            return false;
        }
    }
    return true;
}