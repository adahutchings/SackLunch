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
    },
    
    getAllDays(callback){
        return Day.all()
        .then((days) => {
            callback(null, days);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getDay(id, callback){
        return Day.findById(id)
        .then((day) => {
            callback(null, day);
        })
        .catch((err) => {
            callback(err);
        })
    }
}