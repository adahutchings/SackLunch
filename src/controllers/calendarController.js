const calendarQueries = require("../db/queries.calendar.js");

module.exports = {

    month(req,res,next){
        res.render("calendar/month");
    }
}