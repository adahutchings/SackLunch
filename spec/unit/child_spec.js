const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Child = require("../../src/db/models").Child;

describe("Child", () => {
    beforeEach((done) => {
        this.user;
        this.child;
        sequelize.sync({force: true}).then((res) => {

            User.create({
                email: "user@example.com",
                firstName: "User",
                lastName: "Example",
                username: "user1",
                password: "12345",
                phone: "666-666-6666",
                billingAddress: "123 lane way",
                billingCity: "portland",
                billingState: "Oregon",
                billingZipCode: "97220"
            })
            .then((user) => {
                this.user = user;

                Child.create({
                    firstName: "Nina",
                    lastName: "Gehrts",
                    school: "Cats",
                    userId: this.user.id
                })
                .then((child) => {
                    this.child = child;
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
        it("should create a new child with first and last name, school, and parent's userId", (done) => {
            Child.create({
                firstName: "Blixa",
                lastName: "Gehrts",
                school: "Opal School",
                userId: this.user.id
            })
            .then((child) => {
                expect(child.firstName).toBe("Blixa");
                expect(child.lastName).toBe("Gehrts");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

});