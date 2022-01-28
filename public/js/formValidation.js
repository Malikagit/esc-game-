function validateEmail(str) {
    var components = str.split("@");
    if (components.length != 2) {
        return false;
    }
    var domain = components[1].split(".");
    if (domain.length != 2 || domain[1].length < 2) {
        return false;
    }
    return true;
}
module.exports = "validateEmail"