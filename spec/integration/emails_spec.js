const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/emails";
const sequelize = require("../../src/db/models/index").sequelize;
const Email = require("../../src/db/models").Email;

describe("routes : emails", () => {

    beforeEach((done) => {
        this.email;
        
        sequelize.sync({ force: true}).then((res) => {
            Email.create({
                subject: "First Email",
                body: "Will it work?"
            })
            .then((email) => {
                this.email = email;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /emails", () => {
        it("should return a status code 200 and all emails", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Emails");
                expect(body).toContain("First Email");
                done();
            });
        });
    });
});