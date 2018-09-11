const emailQueries = require("../db/queries.emails.js");

module.exports = {
    inbox(req, res, next){
        emailQueries.getAllEmails((err, emails) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("emails/inbox", {emails});
            }
        })
    }
}