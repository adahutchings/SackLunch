const ApplicationPolicy = require("./application");

module.exports = class UserPolicy extends ApplicationPolicy {

    landing(){
        return this._isUser();
    }

    edit() {
        return this.landing();
    }

    signOut() {
        return this.edit();  
    }

    signUp() {
        return this._isGuest();
    }

    index() {
        return this.signUp();
    }
}