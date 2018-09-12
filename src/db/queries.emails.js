const Email = require("./models").Email;

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
            console.log("SUCCESS");
            callback(null, email);
        })
        .catch((err) => {
            console.log("HERES THE ERROR");
            callback(err);
        })
    }
}