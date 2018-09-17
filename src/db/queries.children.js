const Child = require("./models").Child;
const User = require("./models").User;

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

    updateChild(id, updatedChild, callback){
        return Child.findById(id)
        .then((child) => {
            if(!child) {
                return callback("Child not found");
            }

            child.update(updatedChild, {
                fields: Object.keys(updatedChild)
            })
            .then(() => {
                callback(null, child);
            })
            .catch((err) => {
                callback(err);
            });
        });
    },
    
}