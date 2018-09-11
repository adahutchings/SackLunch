const Email = require("./models").Email;

module.exports = {
    getAllEmails(callback){
        return Email.all()
        .then((emails) => {
            callback(null, emails);
        })
        .catch((err) => {
            callback(err);
        })
    }
}