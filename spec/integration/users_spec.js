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


    describe("basic user actions", () => {
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
        
    });

    describe("Member and Admin user actions", () => {
        beforeEach((done) => {
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
                request.get({
                    url: "http://localhost:3000/auth/fake",
                    form: {
                        role: user.role,
                        userId: user.id,
                        email: user.email
                    }
                }, (err, res, body) => {
                    done();
                });
            });
        });

        describe("GET /users/:id/edit", () => {
            it("should render a view with the user edit options", (done) => {
                request.get(`${base}/${this.user.id}/edit`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Edit Profile");
                    expect(body).toContain("User");
                    done();
                });
            });
        });
    
        describe("POST /users/:id/update", () => {

            it("should return a status code 302", (done) => {
                request.post({
                    url: `${base}/${user.id}/update`,
                    form: {
                        email: "userTwo@example.com",
                        password: "12345",
                        passwordConfirmation: "12345",
                        firstName: "User",
                        lastName: "Example",
                        phone: "666-666-6666",
                        billingAddress: "12345 lane way",
                        billingCity: "portland",
                        billingState: "Oregon",
                        billingZipCode: "97232"
                    }
                }, (err, res, body) => {
                    expect(res.statusCode).toBe(302);
                    done();
                });
            })

            it("should update the user with the given values", (done) => {
                const options = {
                    url: `${base}/${user.id}/update`,
                    form: {
                        firstName: "Ricahrd"
                    }
                };
                request.post(options, (err, res, body) => {

                    expect(err).toBeNull();

                    User.findOne({
                        where: {id: this.user.id}
                    })
                    .then((uesr) => {
                        expect(user.firstName).toBe("Richard");
                        done();
                    });
                });
            });
        });

    });
});