const sequelize = require("../../src/db/models/index").sequelize;
const Email = require("../../src/db/models").Email;
const User = require("../../src/db/models").User;

describe("Email", () => {

    beforeEach((done) => {
        this.user;
        this.email;

        sequelize.sync({force: true}).then((res) => {

            User.create({
                email: "user@example.com",
                firstName: "User",
                lastName: "Example",
                password: "12345",
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

    describe("#create()", () => {
        it("should create a new email with a subject, body and user", (done) => {
            Email.create({
                subject: "Create this",
                body: "It's another email, thanks!",
                userId: this.user.id
            })
            .then((email) => {
                expect(email.subject).toBe("Create this");
                expect(email.body).toContain("It's another email, thanks!");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        it("should not create a new post with missing attributes", (done) => {
            Email.create({
                subject: "Invalid"
            })
            .then((email) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Email.body cannot be null");
                expect(err.message).toContain("Email.userId cannot be null");
                done();
            })
        });
    });

});