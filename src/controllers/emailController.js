const emailQueries = require("../db/queries.emails.js");
const util = require('util');

module.exports = {
    inbox(req, res, next){
        emailQueries.getAllEmails((err, emails) => {

            if(err){
                console.log(err);
                res.redirect(500, "static/index");
            } else {
                res.render("emails/inbox", {emails});
            }
        })
    },

    new(req, res, next){
        res.render("emails/new", {user: req.user});
    },

    create(req, res, next){

        let newEmail = {
            subject: req.body.subject,
            body: req.body.body,
            userId: req.user.id,
            recipient: req.body.recipient,
            sender: req.user.firstName
        };
           
        console.log("REQ LOG: " + util.inspect(req.body));
        emailQueries.createEmail(newEmail, (err, email) => {
            if(err){
                res.redirect(500, "/emails/new");
            } else {
                res.redirect(303, "/emails/inbox");
            }
        });
    },

    show(req, res, next) {
        emailQueries.getEmail(req.params.id, (err, email) => {
            if(err || email == null){
                res.redirect(404, "/");
            } else {
                res.render("emails/show", {email});
            }
        });
    },

    destroy(req, res, next) {
        emailQueries.deleteEmail(req.params.id, (err, email) => {
            if(err) {
                res.redirect(500, `/emails/${email.id}`)
            } else {
                res.redirect(303, "/emails/inbox")
            }
        });
    },
}