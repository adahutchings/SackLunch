const emailQueries = require("../db/queries.emails.js");
const Authorizer = require("../policies/email");
const util = require('util');

module.exports = {
    inbox(req, res, next){
        emailQueries.getAllEmails((err, emails) => {

            const authorized = new Authorizer(req.user).inbox();

            if(authorized){
                if(err){
                    console.log(err);
                    res.redirect(500, "static/index");
                } else {
                    res.render("emails/inbox", {emails});
                }
            } else {
                req.flash("notice", "Please Sign In");
                res.redirect("/users/sign_in");
            }
        });
    },

    sent(req, res, next){
        emailQueries.getAllEmails((err, emails) => {

            const authorized = new Authorizer(req.user).inbox();

            if(authorized){
                if(err){
                    console.log(err);
                    res.redirect(500, "static/index");
                } else {
                    res.render("emails/sent", {emails});
                }
            } else {
                req.flash("notice", "Please Sign In");
                res.redirect("/users/sign_in");
            }
        });
    },

    new(req, res, next){
        const authorized = new Authorizer(req.user).new();

        if(authorized){
            res.render("emails/new", {user: req.user});
        } else {
            req.flash("notice", "Error");
            res.redirect("emails/inbox");
        }
        
    },

    adminNew(req, res, next){

        const authorized = new Authorizer(req.user).adminNew();

        if(authorized){
            res.render("emails/adminNew", {user: req.user});
        } else {
  
            req.flash("notice", "Error");
            res.redirect("emails/inbox");
        }
    },

    adminCreate(req, res, next){

        const authorized = new Authorizer(req.user)._isAdmin();

        if(authorized){
            let newEmail = {
                subject: req.body.subject,
                body: req.body.body,
                userId: req.user.id,
                recipient: req.body.recipient,
                sender: req.user.role
            };

            emailQueries.createEmail(newEmail, (err, email) => {
                if(err){
                    res.redirect(500, "emails/adminNew");
                } else {
                    res.redirect(303, "/emails/inbox");
                }
            });
        } else {
            req.flash("notice", "Error");
            res.redirect("/users/sign_in");
        }
    },

    create(req, res, next){

        const authorized = new Authorizer(req.user).create();

        if(authorized) {
            let newEmail = {
                subject: req.body.subject,
                body: req.body.body,
                userId: req.user.id,
                recipient: "admin",
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
        } else {
            req.flash("notice", "Error");
            res.redirect("/users/sign_in");
        }

        
    },

    show(req, res, next) {
        emailQueries.getEmail(req.params.id, (err, email) => {

            if(err || email == null){
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, email).edit();

                if(authorized){
                    res.render("emails/show", {email});
                } else {
                    req.flash("notice", "Erorr");
                    res.redirect("/users/sign_in");
                }

                
            }
        });
    },

    destroy(req, res, next) {
        emailQueries.deleteEmail(req, (err, email) => {
            if(err) {
                res.redirect(err, `/emails/${email.id}`)
            } else {
                res.redirect(303, "/emails/inbox")
            }
        });
    },
}