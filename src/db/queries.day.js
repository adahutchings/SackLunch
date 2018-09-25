const Day = require("./models").Day;

module.exports = {

    addMeal(newMeal, callback){
        return Day.create(newMeal)
        .then((day) => {
            callback(null, day);
        })
        .catch((err) => {
            callback(err);
        })
    }
}