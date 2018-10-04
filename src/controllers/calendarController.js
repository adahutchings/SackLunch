const dayQueries = require("../db/queries.day.js");
const childQueries = require("../db/queries.children.js");
const Authorizer = require("../policies/calendar");

module.exports = {

    month(req,res,next){

        const authorized = new Authorizer(req.user).month();

        if(authorized){
            dayQueries.getAllDays((err, days) => {
                res.render("calendar/month", {days});
            });
        } else {
            req.flash("notice", "You must sign in");
            res.redirect("/users/sign_in");
        }
        
        
        
    },

    showDay(req, res, next){

        const authorized = new Authorizer(req.user).day();

        if(authorized){
            childQueries.getAllChild((err, children) => {
                dayQueries.getDay(req.params.id, (err, day) => {
                    if(err || day == null){
                        res.redirect(404, "/calendar/month");
                    } else {
                        res.render("calendar/day", {children, day});
                    }
                })
                
            })
        } else {
            req.flash("notice", "Please sign in");
            res.redirect("/users/sign_in");
        }

        


    }



} 