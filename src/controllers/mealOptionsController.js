const dayQueries = require("../db/queries.day.js");

module.exports = {

    mealEntry(req, res, next){
        res.render("mealOptions/mealEntry");
    },

    createMeal(req,res,next){
        let newMeal = {
            date: req.body.date,
            mealOne: req.body.mealOne,
            mealTwo: req.body.mealTwo,
            mealThree: req.body.mealThree
        };

        dayQueries.addMeal(newMeal, (err, day) => {
            if(err){
                console.log(err);
                res.redirect(500, "/calendar/day");
            } else {
                res.redirect(303, "/calendar/month");
            }
        })
    }

}

