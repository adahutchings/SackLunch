const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/emails";
const sequelize = require("../../src/db/models/index").sequelize;
const Email = require("../../src/db/models").Email;
const User = require("../../src/db/models").User;

describe("routes : emails", () => {

    beforeEach((done) => {
        this.email;
        this.user;
        
        sequelize.sync({ force: true}).then((res) => {
            User.create({
                email: "user@example.com",
                password: "12345",
                passwordConfirmation: "12345",
                firstName: "User",
                lastName: "Example",
                phone: "666-666-6666",
                billingAddress: "123 lane way",
                billingCity: "portland",
                billingState: "Oregon",
                billingZipCode: "97220"
            })
            .then((user) => {
                this.user = user;

                Email.create({
                    subject: "First Email",
                    body: "Will it work?",
                    userId: this.user.id
                })
                .then((email) => {
                    this.email = email;
                    done();
                });
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