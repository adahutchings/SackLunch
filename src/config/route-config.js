module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const emailRoutes = require("../routes/emails");
      const childRoutes = require("../routes/children");
      
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(emailRoutes);
      app.use(childRoutes);
    }
  }