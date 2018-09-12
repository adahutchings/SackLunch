const Email = require("./models").Email;
const User = require("./models").User;

module.exports = {
    getAllEmails(callback){
        return Emails.all()
        .then((emails) => {
            callback(null, emails);
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
            callback(err);
        })
    }
}