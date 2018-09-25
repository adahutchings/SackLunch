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

    



}