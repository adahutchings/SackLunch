const ApplicationPolicy = require("./application");

module.exports = class ChildPolicy extends ApplicationPolicy {

    new() {
        return this._isAdmin() || this._isParent();
    }

    all() {
        return this._isOwner();
    }

    create() {
        return this.new();
    }

    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this.update();
    }
}