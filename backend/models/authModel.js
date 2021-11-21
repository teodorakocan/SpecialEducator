const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var passwordHash = require('password-hash');
var mailConfig = require('../configurations/mailConfig');
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
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

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
            .query("SELECT * FROM [User] WHERE idUser='" + user.idUser + "';");

        if (userData.recordset.length > 0) {
            if (userData.recordset[0].email !== user.email) {
                const { status, message } = await User.emailValidation(user.email);
                if (status === 'success') {
                    const result = MailDelivery.sendUserDataUpdates(user);
                    if (result) {
                        return ({ status: 'failed' });
                    }
                } else {
                    return ({ status: 'failed', message: message })
                }
            }

            await request.request().query("UPDATE [User] SET name = '" + user.name + "', lastName ='" + user.lastName + "', email ='" + user.email + "' WHERE idUser = '" + user.idUser + "';");
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
        const { user } = await Authenticated.userData(userId);
        const isVerified = passwordHash.verify(oldPassword, user.password);
        if (isVerified) {
            const hashedPassword = passwordHash.generate(newPassword);
            let request = await sql.connect(dbConfig);

            await request.request().query("UPDATE [User] SET password = '" + hashedPassword + "' WHERE idUser = '" + userId + "';");
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
            .query("UPDATE [User] SET image = '" + imageName + "' WHERE idUser = '" + id + "';");

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.centerData = async (id) => {
    try {
        let request = await sql.connect(dbConfig);
        const { user } = await Authenticated.userData(id);

        var centerData = await request.request()
            .query("SELECT * FROM center WHERE idCenter='" + user.idCenter + "';");

        if (centerData.recordset.length > 0) {
            return ({ status: 'success', center: centerData.recordset[0] });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Authenticated;