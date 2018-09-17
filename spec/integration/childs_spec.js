const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/child";
const sequelize = require("../../src/db/models/index").sequelize;

const Child = require("../../src/db/models").Child;
const User = require("../../src/db/models").User;

describe("routes : child", () => {
    beforeEach((done) => {
        this.child;
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

                Child.create({
                    firstName: "bob",
                    lastName: "villa",
                    school: "woodshop",
                    userId: this.user.id
                })
                .then((child) => {
                    this.child = child;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
   

    describe("GET /child", () => {
        it("should return a status code 200 and all children", (done) => {
            request.get(`${base}`, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Children");
                expect(body).toContain("bob");
                done();
            })
        })
    })

    describe("GET /child/new", () => {
        it("should return a new child form", (done) => {
            request.get(`${base}/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Child");
                done();
            });
        });
    });

    describe("POST /child/create", () => {

        const options = {
            url: `${base}/create`,
            form: {
                firstName: "Blixa",
                lastName: "Gehrts",
                school: "Opal School",

            }
        };

        /*it("should create a new child and redirect", (done) => {
            request.post(options, (err, res, body) => {
                Child.findOne({where: {firstName: "Blixa"}})
                .then((child) => {
                    expect(res.statusCode).toBe(303);
                    expect(child.firstName).toBe("Blixa");
                    expect(child.lastName).toBe("Gehrts");
                    expect(child.school).toBe("Opal School");
                    done();
                })
                .catch((err) => {
                    console.log("CHILD : " + child);
                    console.log(err);
                    done();
                });
            });
        }); */ 
    });

    describe("GET /child/:id/edit", () => {
        it("should render a view with an edit child form", (done) => {
            request.get(`${base}/${this.child.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Child");
                expect(body).toContain("bob");
                done();
            });
        });
    });

    describe("POST /child/:id/update", () => {
        it("should update the child with the given values", (done) => {
            const options = {
                url: `${base}/${this.child.id}/update`,
                form: {
                    firstName: "Bobby",
                    lastName: "Villa"
                }
            };

            request.post(options, (err, res, body) => {
                expect(err).toBeNull();

                Child.findOne({
                    where: { id: this.child.id }
                })
                .then((child) => {
                    expect(child.firstName).toBe("Bobby");
                    done();
                });
            });
        });
    });

    
});