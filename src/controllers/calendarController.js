const dayQueries = require("../db/queries.day.js");

module.exports = {

    day(req,res,next){
        res.render("calendar/day");
    },

    month(req,res,next){
        
        dayQueries.getAllDays((err, days) => {
            res.render("calendar/month", {days});
        })
        
    },

    showDay(req, res, next){

        dayQueries.getDay(req.params.id, (err, day) => {
            if(err || day == null){
                res.redirect(404, "/calendar/month", {days});
            } else {
                res.render("calendar/day", {day});
            }
        })
    }



}