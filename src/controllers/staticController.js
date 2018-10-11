const Authorizer = require("../policies/user");

module.exports = {
    index(req, res, next){

      const authorized = new Authorizer(req.user).index();

      if(authorized) {
        res.render("static/index", {title: "Welcome to SackLunch"});
      } else {
        res.render("users/landing");
      }
      
    }
  }