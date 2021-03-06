const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/emails";
const sequelize = require("../../src/db/models/index").sequelize;

const Email = require("../../src/db/models").Email;
const User = require("../../src/db/models").User;

describe("routes : emails", () => {

    // PARENT USER //
    describe("parent user for email model", () => {

        beforeEach((done) => {
            this.email;
            this.user;
    
            sequelize.sync({force: true}).then((res) => {
                User.create({
                    email: "user@example.com",
                    password: "12345",
                    passwordConfirmation: "12345",
                    userName: "parent1",
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
                        userId: this.user.id,
                        sender: this.user.firstName,
                        recipient: "George"
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
    
        describe("GET /emails/sent", () => {
            it("should retrun a status code of 200 and all emails", (done) => {
                request.get(`${base}/sent`, (err, res, body) => {
                    
                    expect(res.statusCode).toBe(200);
                    expect(err).toBeNull();
                    expect(body).toContain("Messages");
                    expect(body).toContain("Testing");
                    done();
                });
            });
        });
    
        describe("GET /emails/:id", () => {
            it("should render a view with the selected email", (done) => {
                request.get(`${base}/${this.email.id}`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Testing");
                    done();
                })
            })
        })
    
        describe("GET /emails/new", () => {
            it("should render a new email form", (done) => {
                request.get(`${base}/new`, (err, res, body) => {
                    expect(err).toBeNull();
                    /*expect(body).toContain("New Message");*/
                    done();
                });
            });
        });
    
        /*describe("POST /emails/create", () => {
            it("should create a new email and redirect", (done) => {
                const options = {
                    url: `${base}/create`,
                    form: {
                        subject: "Blast off",
                        body: "Come on home",
                        userId: this.user.id,
                        sender: this.user.firstName,
                        recipient: "Ground Control"
                    }
                };
                request.post(options, (err, res, body) => {
                    Email.findOne({where: {subject: "Blast off"}})
                    .then((email) => {
    
                        expect(email).not.toBeNull();
                        expect(email.subject).toBe("Blast off");
                        expect(email.body).toBe("Come on home");
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
        }) */
    
        describe("POST /emails/:id/destroy", () => {
            it("should delete the email with associated Id", (done) => {
                Email.all()
                .then((emails) => {
                    const emailCountBeforeDelete = emails.length;
    
                    expect(emailCountBeforeDelete).toBe(1);
    
                    request.post(`${base}/${this.email.id}/destroy`, (err, res, body) => {
                        Email.all()
                        .then((emails) => {
                            expect(err).toBeNull();
                            expect(emails.length).toBe(emailCountBeforeDelete -1);
                            done();
                        });
                    });
                });
            });
        });
    });

    // ADMIN USER //
    describe("admin user email fetures", () => {
        beforeEach((done) => {
            this.email;
            this.user;
            
            sequelize.sync({force: true}).then((res) => {
                User.create({
                    email: "admin@admin.com",
                    password:"67890",
                    passwordConfirmation: "67890",
                    userName: "admin1",
                    firstName: "Admin",
                    lastName: "Example",
                    phone: "123-456-7890",
                    billingAddress: "420 admiral way",
                    billingCity: "Porland",
                    billingState: "Oregon",
                    billingZipCode: "97212",
                    role: "admin"
                })
                .then((user) => {
                    this.user = user;
                    Email.create({
                        subject: "Message From Admin",
                        body: "You have a new message",
                        userId: this.user.id,
                        sender: this.user.role,
                        recipient: "Ada"
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
                request.get(`${base}/adminNew`, (err, res, body) => {
                    expect(err).toBeNull();
                    done();
                });
            });
        });


    });
    
});