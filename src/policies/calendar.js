const ApplicationPolicy = require("./application");

module.exports = class CalendarPolicy extends ApplicationPolicy {

    month() {
        return this._isAdmin() || this._isParent();
    }   

    day() {
        return this.month();
    }
}