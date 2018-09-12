const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/inbox";
const sequelize = require("../../src/db/models/index").sequelize;
const Email = require("../../src/db/models").Email;

describe("routes : emails", () => {

  describe("GET /users/inbox", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});