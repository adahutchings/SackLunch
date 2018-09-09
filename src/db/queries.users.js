const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {

    createUser(newUser, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            email: newUser.email,
            password: hashedPassword,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            billingAddress: newUser.billingAddress,
            billingCity: newUser.billingCity,
            billingState: newUser.billingState,
            billingZipCode: newUser.billingZipCode
        })
        .then((user) => {
            console.log("TEST ----- " + user);
            callback(null, user);
        })
        .catch((err) => {
            console.log("TEST ERR ----- " + user);
            callback(err);
        })
    }
}