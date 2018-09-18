const ApplicationPolicy = require("./application");

module.exports = class EmailPolicy extends ApplicationPolicy {

    inbox() {
        return this._isAdmin() || this._isParent();
    }

    new() {
        return this._isAdmin() || this._isParent();
    }

    create() {
        return this.new();
    }

    show() {
        return this.destroy();
    }

    destroy() {
        return this._isAdmin() || (this._isParent() && this._isOwner());
    }
}