const emailQueries = require("../db/queries.emails.js");
const util = require('util');

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
            userId: req.user.id
        };
           
        console.log("REQ LOG: " + util.inspect(req.body));
        emailQueries.createEmail(newEmail, (err, email) => {
            if(err){
                console.log("CONTROLLER FAIL: " + err);
                res.redirect(500, "/emails/new");
            } else {
                console.log("CONTROLLER SUCESS");
                res.redirect(303, "/emails/inbox");
            }
        });
    }
}