const childQueries = require("../db/queries.children.js");
const Authorizer = require("../policies/children");

module.exports = {
    all(req, res, next){
        childQueries.getAllChild((err, children) => {

            if(err){
                res.redirect(500, "static/index")
            } else {

                const authorized = new Authorizer(req.user).all();

                if(authorized){ 
                    res.render("child/show", {children});
                } else {
                    req.flash("notice", "You must sign in");
                    res.redirect("/users/sign_in");
                }
            }
        });  
    },

    new(req, res, next){

        const authorized = new Authorizer(req.user).new();

        if(authorized){
            res.render("child/new");
        } else {
            req.flash("notice", "Please Sign In");
            res.redirect("/users/sign_in");
        }
        
    },

    create(req, res, next) {

        const authorized = new Authorizer(req.user).create();

        if(authorized){
            let newChild = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                school: req.body.school,
                userId: req.user.id
            };
    
            childQueries.addChild(newChild, (err, child) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "/child/new")
                } else {
                    res.redirect(303, "/child")
                }
            });
        } else {
            req.flash("notice", "Please Sign In");
            res.redirect("/users/sign_in");
        }

        
    },

    edit(req, res, next){

        childQueries.getChild(req.params.id, (err, child) => {

            if(err || child == null){
                res.redirect(404, "/child");
            } else {
                const authorized = new Authorizer(req.user, child).edit();

                if(authorized){
                    res.render("child/edit", {child});
                } else {
                    req.flash("Unauthorized");
                    res.redirect("/child");
                }
                
            }
        });
    },

    update(req, res, next) {
        childQueries.updateChild(req, req.body, (err, child) => {
            if(err || child == null) {
                res.redirect(401, `/child/${req.params.id}/edit`);
            } else {
                res.redirect("/child");
            }
        })
    },

    destroy(req, res, next){
        childQueries.deleteChild(req, (err, child) => {
            if(err){
                res.redirect(err, `/child/${req.params.id}/edit`)
            } else {
                res.redirect(303, "/child")
            }
        })
    }

}