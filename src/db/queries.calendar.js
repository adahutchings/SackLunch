var calendar = require('node-calendar');
var cal = new calendar.Calendar(calendar.SUNDAY);
var yearCalendar = cal.yeardayscalendar(2018);

module.exports = {

    addMeal(newMeal, callback){
        return Meal.addMeal(newMeal)
        .then((meal) => {
            callback(null, meal);
        })
        .catch((err) => {
            callback(err);
        });
    }
}