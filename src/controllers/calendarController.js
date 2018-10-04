const dayQueries = require("../db/queries.day.js");
const childQueries = require("../db/queries.children.js");
const userQueries = require("../db/queries.users.js");

module.exports = {

    month(req,res,next){
        
        dayQueries.getAllDays((err, days) => {
            res.render("calendar/month", {days});
        })
        
    },

    showDay(req, res, next){

        childQueries.getAllChild((err, children) => {
            dayQueries.getDay(req.params.id, (err, day) => {
                if(err || day == null){
                    res.redirect(404, "/calendar/month");
                } else {
                    res.render("calendar/day", {children, day});
                }
            })
            
        })


    }



}