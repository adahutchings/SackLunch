const ApplicationPolicy = require("./application");

module.exports = class MealOrderPolicy extends ApplicationPolicy {

    mealEntry() {
        return this._isAdmin();
    }
    
    createMeal() {
        return this.mealEntry();
    }

    orderMeal() {
        return this._isAdmin() || this._isParent();
    }
}