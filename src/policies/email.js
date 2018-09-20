const ApplicationPolicy = require("./application");

module.exports = class EmailPolicy extends ApplicationPolicy {

    inbox() {
        return this._isAdmin() || this._isParent();
    }
    
    sent() {
        return this._inbox();
    }

    new() {
        return this._isAdmin() || this._isParent();
    }

    adminNew(){
        return this._isAdmin(); 
    }

    create() {
        return this.new();
    }

    show() {
        return this._isAdmin() || (this._isParent() && this._isRecipient()) || (this._isParent() && this._isSender());
    }

    destroy() {
        return this._isAdmin() || (this._isParent() && this._isOwner());
    }
}