const childQueries = require("../db/queries.children.js");

module.exports = {
    all(req, res, next){
        childQueries.getAllChild((err, children) => {
            if(err){
                res.redirect(500, "static/index")
            } else {
                res.render("child/show", {children});
            }
        })
    },

    new(req, res, next){
        res.render("child/new");
    },

    create(req, res, next) {

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
    },

    edit(req, res, nest){
        childQueries.getChild(req.params.id, (err, child) => {

            if(err || child == null){
                console.log("CHILD ID LOG: " + req.params.id);
                console.log("EDIT ERROR: " + err);
                res.redirect(404, "/child");
            } else {
                res.render("child/edit", {child});
            }
        });
    },

    update(req, res, next) {
        childQueries.updateChild(req.params.id, req.body, (err, child) => {
            if(err || child == null) {
                res.redirect(404, `/child/${req.params.id}/edit`);
            } else {
                res.redirect("/child");
            }
        })
    }

}