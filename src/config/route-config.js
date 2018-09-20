module.exports = {
    init(app){

      const staticRoutes = require("../routes/static");
      const userRoutes = require("../routes/users");
      const emailRoutes = require("../routes/emails");
      const childRoutes = require("../routes/children");
      const calendarRoutes = require('../routes/calendar');

      if(process.env.NODE_ENV === "test") {
        const mockAuth = require("../../spec/support/mock-auth.js");
        mockAuth.fakeIt(app);
      }
      
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(emailRoutes);
      app.use(childRoutes);
      app.use(calendarRoutes);
    }
  }