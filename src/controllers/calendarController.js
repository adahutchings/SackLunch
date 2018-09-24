const calendarQueries = require("../db/queries.calendar.js");

module.exports = {

    month(req,res,next){
        res.render("calendar/month");
    },

    day(req,res,next){
        res.render("calendar/day", {user: req.user, childId: req.child});
    },

    selectMeal(req, res, next){
        let newMeal = {
            mealOption: req.body.mealOption,
            dayOrdered: req.body.dayOrderd,
            userId: req.user.id,
            childId: req.body.childId
        };

        calendarQueries.addMeal(newMeal, (err, meal) => {
            if(err){
                res.redirect(500, "/calendar/day");
            } else {
                res.redirect(303, "/calendar/month");
            }
        })
    }
}