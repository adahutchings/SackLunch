const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const util = require('util');
const Authorizer = require("../policies/user");

module.exports = {
    
    signUp(req, res, next){
        
        const authorized = new Authorizer(req.user).signUp();

        if(authorized){
            res.render("users/sign_up");
        } else {
            res.redirect("/users/landing");
        }
        
    },

    create(req, res, next){
        console.log("BODY:", req.body);
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            billingAddress: req.body.billingAddress,
            billingCity: req.body.billingCity,
            billingState: req.body.billingState,
            billingZipCode: req.body.billingZipCode
        };

        userQueries.createUser(newUser, (err, user) => {
            if(err){
                console.log(err);
                req.flash("Sign In Error");
                res.redirect("/users/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/users/landing");
                })
            }
        });
    },
    signInForm(req,res,next){

        const authorized = new Authorizer(req.user).signUp();

        if(authorized){
            res.render("users/sign_in");
        } else {
            res.redirect("/users/landing");
        }
        
    },
    signIn(req,res,next){
        passport.authenticate("local")(req, res, function () {
            if(!req.user){
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                res.redirect("/users/landing");
            }
        })
    },

    signOut(req,res,next){

        const authorized = new Authorizer(req.user).signOut();

        if(authorized){
            req.logout();
            req.flash("notice", "You've successfully signed out");
            res.redirect("/");
        } else {
            res.redirect("/users/sign_in");
        }

    },

    edit(req,res,next){

        const authorized = new Authorizer(req.user).edit();

        if(authorized) {
            userQueries.getUser(req.params.id, (err, user) => {
                if(err || user == null){
                    console.log("ERROR: " + err);
                    console.log("USER: " + user);
                    console.log("REQ: "  + util.inspect(req.parmas));
                    res.redirect(404, "/users/landing");
                } else {
                    console.log("PASS");
                    res.render("users/edit", {user});
                }
            })
        } else {
            req.flash("You are not authorized to do that");
            res.redirect("/users/landing");
        }

        
    },

    landing(req, res, next){

        const authorized = new Authorizer(req.user).landing();

        if(authorized){
            res.render("users/landing");
        } else {
            res.redirect("/users/sign_in");
        }
        
    }
} 