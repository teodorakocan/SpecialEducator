const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var passwordHash = require('password-hash');
var mailCongig = require('../configurations/mailConfig');
var User = require('../models/userModel');

const Authenticated = function (user) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.image = user.image;
    this.role = user.role;
    this.password = user.password;
};

Authenticated.userData = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE iduser='" + id + "';");

        if (userData.recordset.length > 0) {
            return ({ status: 'success', user: userData.recordset[0] });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.changeUserData = async (user) => {
    try {
        let request = await sql.connect(dbConfig);

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE iduser='" + user.iduser + "';");

        if (userData.recordset.length > 0) {
            if (userData.recordset[0].email !== user.email) {
                const { status, message } = await User.emailValidation(user.email);
                if (status === 'success') {
                    var mailOptions = {
                        from: 'specialeducator2021@gmail.com',
                        to: user.email,
                        subject: 'Special Educator',
                        text: 'You have successfully changed email address on Special Educator app from ' + userData.recordset[0].email + ' to ' + user.email + '. ' +
                            'From now on all other information will be sent on ' + user.email + ', and you will be logged in with this new email address as your username.'
                    };
                    mailCongig.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return ({ status: 'failed' });
                        }
                    });
                } else {
                    return ({ status: 'failed', message: message })
                }
            }

            await request.request().query("UPDATE [User] SET name = '" + user.name + "', lastName ='" + user.lastName + "', email ='" + user.email + "' WHERE iduser = '" + user.iduser + "';");
            return ({ status: 'success', message: 'You have successfully changed your profile information.' });
        }
        return ({ status: 'failed' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.changePassword = async (userId, newPassword, oldPassword) => {
    try {
        const {user} = await Authenticated.userData(userId);
        const isVerified = passwordHash.verify(oldPassword, user.password);
        if (isVerified) {
            const hashedPassword = passwordHash.generate(newPassword);
            let request = await sql.connect(dbConfig);

            await request.request().query("UPDATE [User] SET password = '" + hashedPassword + "' WHERE iduser = '" + userId + "';");
            return ({ status: 'success', message: 'You have successfully changed your password.' });
        } else {
            return ({ status: 'failed', message: 'Old password is incorrect.' });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.changeImage = async (id) => {
    try {
        let request = await sql.connect(dbConfig);
        await request.request()
            .query("UPDATE [User] SET image = '" + imageName + "' WHERE iduser = '" + id + "';");

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.centerData = async (id) => {
    try {
        let request = await sql.connect(dbConfig);
        const {user} = await Authenticated.userData(id);

        var centerData = await request.request()
        .query("SELECT * FROM center WHERE idcenter='" + user.Center_IDCenter + "';");

        if (centerData.recordset.length > 0) {
            return ({ status: 'success', center: centerData.recordset[0] });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Authenticated;