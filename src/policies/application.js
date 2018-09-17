module.exports = class ApplicationPolicy {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    // for emails and children parent user is _isOwner
    _isOwner() {
        return this.record && (this.record.userId == this.user.id);
    }

    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isParent() {
        return this.user && this.user.role == "parent";
    }

    new() {
        return this.user != null;
    }

    create() {
        return this.new();
    }

    show(){
        return true;
    }

    edit(){
        return this.new() && (this._isOwner() || this._isAdmin());
    }

    update(){
        return this.edit();
    }

    destroy(){
        return this.update();
    }
}