module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const emailRoutes = require("../routes/emails");
      
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(emailRoutes);
    }
  }