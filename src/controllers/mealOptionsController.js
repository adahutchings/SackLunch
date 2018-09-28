const dayQueries = require("../db/queries.day.js");

module.exports = {

    mealEntry(req, res, next){
        res.render("mealOptions/mealEntry");
    },

    createMeal(req,res,next){
        let newMeal = {
            date: req.body.date,
            mealOne: req.body.mealOne,
            mealOneDesc: req.body.mealOneDesc,
            mealTwo: req.body.mealTwo,
            mealTwoDesc: req.body.mealTwoDesc,
            mealThree: req.body.mealThree,
            mealThreeDesc: req.body.mealThreeDesc
        };

        dayQueries.addMeal(newMeal, (err, day) => {
            if(err){
                console.log(err);
                res.redirect(500, "/calendar/day");
            } else {
                res.redirect(303, "/calendar/month");
            }
        })
    },

    orderMeal(req, res, next){
        let newOrder = {
            mealOrdered: req.body.mealOrdered,
            userId: req.user.id,
            childId: req.child.id,
            date: req.day.date
        };

        mealOrderQueries.addOrder(newOrder, (err, mealOrder) => {
            if(err){
                console.log(err);
                res.redirect(500, "/calendar/day");
            } else {
                res.redirect(303, "/calendar/month");
            }
        })
    }

}

