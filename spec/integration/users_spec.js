const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
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

    describe("GET /users/sign_up", () => {
        it("should render a view with a sign up form", (done) => {
            request.get(`${base}/sign_up`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign up");
                done();
            });
        });
    });

    describe("POST /users", () => {
        /*it("should create a new user with vaild values and redirect", (done) => {
            const options = {
                url: base, 
                form: {
                    email: "user@example.com",
                    password: "12345",
                    passwordConfirmation: "12345",
                    userName: "user1",
                    firstName: "User",
                    lastName: "Example",
                    phone: "666-666-6666",
                    billingAddress: "123 lane way",
                    billingCity: "portland",
                    billingState: "Oregon",
                    billingZipCode: "97220"
                }
            }

            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "user@example.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe("user@example.com");
                    expect(user.id).toBe(1);
                    expect(user.firstName).toBe("User");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
        */
        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post(
                {
                    url: base,
                    form: {
                        email: "no",
                        firstName: "User",
                        lastName: "Example",
                        userName: "user2",
                        password: "12345",
                        phone: "666-666-6666",
                        billingAddress: "123 lane way",
                        billingCity: "portland",
                        billingState: "Oregon",
                        billingZipCode: "97220"
                    }
                }, (err, res, body) => {
                    User.findOne({where: {email: "no"}})
                    .then((user) => {
                        expect(user).toBeNull();
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

   describe("GET /users/sign_in", () => {
        it("should render a view with the sign in form", (done) => {
            request.get(`${base}/sign_in`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign In");
                done();
            });
        });
    });

    describe("GET /users/edit", () => {
        it("should render a view with the user edit options", (done) => {
            request.get(`${base}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Profile");
                done();
            });
        });
    });

});