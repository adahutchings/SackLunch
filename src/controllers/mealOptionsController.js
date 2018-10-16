const dayQueries = require("../db/queries.day.js");
const mealOrderQueries = require("../db/queries.mealOrders.js");
const childQueries = require("../db/queries.children.js");
const Authorizer = require("../policies/mealOrder");

module.exports = {

    mealEntry(req, res, next){

        const authorized = new Authorizer(req.user).mealEntry();

        if(authorized){
            res.render("mealOptions/mealEntry");
        } else {
            req.flash("notice", "You are not authorized to do that. Only Admins can creat meals.");
            res.redirect("/users/landing");
        }
        
    },

    createMeal(req,res,next){

        const authorized = new Authorizer(req.user).createMeal();

        if(authorized){
            let newMeal = {
                date: req.body.date,
                mealOne: req.body.mealOne,
                mealOneDesc: req.body.mealOneDesc,
                mealTwo: req.body.mealTwo,
                mealTwoDesc: req.body.mealTwoDesc, 
                mealThree: req.body.mealThree,
                mealThreeDesc: req.body.mealThreeDesc,
                weekDay: req.body.weekDay,
                dayNumber: req.body.dayNumber
            };
    
            dayQueries.addMeal(newMeal, (err, day) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "/calendar/day");
                } else {
                    res.redirect(303, "/calendar/month");
                }
            })
        } else {
            req.flash("notice", "You are not authorized to do that. Only Admins can creat meals.");
            res.redirect("/users/landing");
        }
        
    },


    orderMeal(req, res, next){
        
        const authorized = new Authorizer(req.user).orderMeal();

        if(authorized){
            let newOrder = {
                mealOrdered: req.body.mealOrdered,
                userId: req.body.userId,
                childId: req.body.childId,
                dayId: req.body.dayId,

            };
    
            mealOrderQueries.addOrder(newOrder, (err, mealOrder) => {
                if(err){
                    console.log(err);
                    res.redirect(500, "/calendar/day");
                } else {
                    res.redirect(303, "/calendar/month");
                }
            })
        } else {
            req.flash("notice", "You are not authorized to do that. Only Admins can creat meals.");
            res.redirect("/users/landing");
        }
        
    }

}

