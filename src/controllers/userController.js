const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    
    signUp(req, res, next){
        res.render("users/sign_up");
    },

    create(req, res, next){
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
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
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've sucessfully signed in");
                    res.redirect("/");
                })
            }
        });
    },

}