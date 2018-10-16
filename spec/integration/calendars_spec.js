const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/calendar";
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : calendar", () => {

    describe("GET /calendar/month", () => {
        it("should return the month calendar view", (done) => {
            request.get(`${base}/month`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("This will be calendar");
                done();
            })
        })
    })
})