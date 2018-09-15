const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/child";
const sequelize = require("../../src/db/models/index").sequelize;

const Child = require("../../src/db/models").Child;
const User = require("../../src/db/models").User;

describe("routes : child", () => {
    

    describe("GET /child/all", () => {
        it("should return a status code 200", (done) => {
            request.get(`${base}`, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            })
        })
    })

});