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

        sequelize.sync({force: true}).then((res) => {
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
                    subject: "Testing",
                    body: "Ground control this is major Tom",
                    userId: this.user.id
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
    });

    describe("GET /emails/new", () => {
        it("should render a new email form", (done) => {
            request.get(`${base}/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Message");
                done();
            });
        });
    });

    describe("POST /emails/create", () => {
        it("should create a new email and redirect", (done) => {
            const options = {
                usl: `${base}/create`,
                form: {
                    subject: "Blast off",
                    body: "Come on home",
                }
            };
            request.post(options, (err, res, body) => {
                Email.findOne({where: {subject: "Blast off"}})
                .then((email) => {
                    
                    expect(email).not.toBeNull();
                    expect(email.subject).toBe("Blast off");
                    expect(email.subject).toBe("Come on home");
                    expect(email.userId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
                }
            )
        })
    })
});