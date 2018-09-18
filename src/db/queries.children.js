const Child = require("./models").Child;
const User = require("./models").User;
const Authorizer = require("../policies/children");

module.exports = {
    getAllChild(callback){
        return Child.all()

        .then((children) => {
            callback(null, children);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addChild(newChild, callback){
        return Child.create(newChild)
        .then((child) => {
            callback(null, child);
        })
        .catch((err) => {
            callback(err);
        });
    },

    getChild(id, callback){
        return Child.findById(id)
        .then((child) => {
            callback(null, child);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateChild(req, updatedChild, callback){
        return Child.findById(req.params.id)
        .then((child) => {
            if(!child) {
                return callback("Child not found");
            }

            const authorized = new Authorizer(req.user, child).update();

            if(authorized) {

                child.update(updatedChild, {
                    fields: Object.keys(updatedChild)
                })
                .then(() => {
                    callback(null, child);
                })
                .catch((err) => {
                    callback(err);
                });
            } else {
                req.flash("notice", "Not Authorized");
                callback("Forbidden");
            }

            
        });
    },

    deleteChild(req, callback){
        return Child.findById(req.params.id)
        .then((child) => {
            const authorized = new Authorizer(req.user, child).destroy();

            if(authorized) {
                child.destroy()
                .then((res) => {
                    callback(null, child);
                });
            } else {
                req.flash("notice", "Not Authorized")
                callback(401);
            }
        })
        .catch((err) => {
            callback(err);
        })
    }
    
}