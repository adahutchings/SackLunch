const emailQueries = require("../db/queries.emails.js");
const util = require('util');

module.exports = {
    inbox(req, res, next){
        emailQueries.getAllEmails((err, emails) => {
            console.log(emails);
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("emails/inbox", {emails});
            }
        })
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