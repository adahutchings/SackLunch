const Child = require("./models").Child;
const User = require("./models").User;

module.exports = {
    getAllChild(callback){
        return Child.all()

        .then((childs) => {
            callback(null, childs);
        })
        .catch((err) => {
            callback(err);
        })
    }
}