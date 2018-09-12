const emailQueries = require("../db/queries.emails.js");

module.exports = {
    inbox(req, res, next){
        res.send("TODO: list emails");
    },

    new(req, res, next){
        res.render("emails/new");
    },

    create(req, res, next){
        let newEmail = {
            subject: req.body.subject,
            body: req.body.body,
            userId: req.params.userId
        };
        emailQueries.createEmail(newEmail, (err, email) => {
            if(err){
                console.log("TEST ==== " + err);
                res.redirect(500, "/emails/new");
            } else {
                console.log("QUERIES TEST SUCESS");
                res.redirect(303, "emails/inbox");
            }
        });
    }
}