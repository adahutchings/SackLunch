const MealOrder = require("./models").mealOrder;

module.exports = {

    addOrder(newOrder, callback){
        return MealOrder.create(newOrder)
        .then((mealOrder) => {
            callback(null, mealOrder);
        })
        .catch((err) => {
            callback(err);
        })
    }
}