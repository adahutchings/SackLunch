const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });
    
    describe("#create", () => {
        it("should create a User oject with email, password, contact info", (done) => {
            User.create({
                email: "user@example.com",
                userName: "user1",
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
                expect(user.email).toBe("user@example.com");
                expect(user.firstName).toBe("User");
                expect(user.lastName).toBe("Example");
                expect(user.password).toBe("12345");
                expect(user.phone).toBe("666-666-6666");
                expect(user.billingAddress).toBe("123 lane way");
                expect(user.billingCity).toBe("portland");
                expect(user.billingState).toBe("Oregon");
                expect(user.billingZipCode).toBe("97220");
                expect(user.id).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a user with invalid email or password", (done) => {
            User.create({
                email: "this is not an email",
                password: "12345"
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Validation error: must be a vaild email");
                done();
            });
        });

        it("should not create a user with an email already taken", (done) => {
            User.create({
                email: "user@example.com",
                password: "67890",
                firstName: "frank",
                lastName: "lloyd-wright",
                phone: "666-666-6666",
                billingAddress: "123 lane way",
                billingCity: "portland",
                billingState: "Oregon",
                billingZipCode: "97220"

            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Validation error");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});