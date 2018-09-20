const Email = require("./models").Email;
const User = require("./models").User;
const Authorizer = require("../policies/email");

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
            callback(err);
        })
    },
    
    deleteEmail(req, callback){
        
        return Email.findById(req.params.id)
        .then((email) => {
            const authorized = new Authorizer(req.user, email).destroy();

            if(authorized) {
                email.destroy()
                .then((res) => {
                    callback(null, email);
                });
            } else {
                req.flash("notice", "Error");
                callback(401);
            }
        })
        .catch((err) => {
            callback(err);
        })
    }
}