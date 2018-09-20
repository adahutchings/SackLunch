const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

    createUser(newUser, callback){
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            email: newUser.email,
            password: hashedPassword,
            passwordConfirmation: hashedPassword,
            userName: newUser.userName,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            billingAddress: newUser.billingAddress,
            billingCity: newUser.billingCity,
            billingState: newUser.billingState,
            billingZipCode: newUser.billingZipCode
        })
        .then((user) => {

            const msg = {
                to: newUser.email,
                from: 'donotreply@sacklunch.com',
                subject: 'Welcome to SackLunch',
                text: 'Thank you for joining SackLunch. To start ordering lunches please sign in to your account and create a child profile. -The SackLunch Team',
                html: 'Thank you for joining SackLunch. To start ordering lunches please sign in to your account and create a child profile.<br><br> -The SackLunch Team',
            };

            sgMail.send(msg);

            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    }
}