const Email = require("./models").Email;
const User = require("./models").User;

module.exports = {
    getAllEmails(callback){
        return Email.all()
        .then((emails) => {
            callback(null, emails);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getEmail(id, callback){
        return Email.findById(id)
        .then((email) => {
            callback(null, email);
        })
        .catch((err) => {
            callback(err);
        })
    },

    createEmail(newEmail, callback){
        return Email.create(newEmail)
        .then((email) => {
            
            callback(null, email);
        })
        .catch((err) => {
            console.log("EMAIL LOG: " + newEmail.userId);
            console.log("QUERIES FAIL: " + err);
            callback(err);
        })
    }
}