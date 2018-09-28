const MealOrder = require("./models").mealOrder;

module.exports = {

    addOrder(newOrder, callback){
        return MealOrder.addOrder(newOrder)
        .then((order) => {
            callback(null, order);
        })
        .catch((err) => {
            callback(err);
        })
    }
}