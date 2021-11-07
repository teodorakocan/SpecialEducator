const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var passwordHash = require('password-hash');
var mailCongig = require('../configurations/mailConfig');

const Center = function (center) {
    this.name = center.name;
    this.address = center.address;
    this.addressNUmber = center.addressNumber;
    this.city = center.city;
    this.email = center.email;
    this.phoneNumber = center.phoneNumber;
    this.areaCode = center.areaCode;
    this.state = center.state;
};

Center.validation = async (name, email) => {
    try {
        let status = '';
        let message = '';
        let request = await sql.connect(dbConfig);

        var existingCenter = await request.request()
            .query("SELECT * FROM center WHERE name='" + name + "';");

        if (existingCenter.recordset.length > 0) {
            status = 'failed';
            message = 'Name of center is already taken. Please change.'
            return ({ status, message });
        } else {
            var existingCenter = await request.request()
                .query("SELECT * FROM center WHERE email='" + email + "';");

            if (existingCenter.recordset.length > 0) {
                status = 'failed';
                message = 'Email address has been already taken. Please change.'
                return ({ status, message });
            }
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Center.registration = async (user, center, areaCode, phoneNumber) => {
    try {
        const hashedPassword = passwordHash.generate(user.password);
        let request = await sql.connect(dbConfig);

        var newCenter = await request.request()
            .query("INSERT INTO center (name, address, addressNumber, city, email, phoneNumber, areaCode, state)" +
                "VALUES ('" + center.name + "', '" + center.address + "', '" + center.addressNumber + "', '" + center.city
                + "', '" + center.email + "', '" + phoneNumber + "', '" + areaCode + "', '" + center.state
                + "'); SELECT SCOPE_IDENTITY() AS id");

        var idCenter = parseInt(newCenter.recordset[0].id);
        var newUser = await request.request()
            .query("INSERT INTO [User] (name, lastName, email, image, role, Center_IDCenter, password)"
                + "VALUES ('" + user.name + "', '" + user.lastName + "', '" + user.email + "', '" + imageName
                + "', 'admin', " + idCenter + ", '" + hashedPassword + "');");

        var mailOptionsCenter = {
            from: 'specialeducator2021@gmail.com',
            to: user.email,
            subject: 'Special Educator',
            text: 'Welcome. You have successfully registered your special education center, ' + name + ', on the Special Educator application. Enjoy using it.'
        };

        mailCongig.sendMail(mailOptionsCenter, function (error, info) {
            if (error) {
                return ({ status: 'failed' });
            } else {
                return ({ status: 'success' });
            }
        });
        
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Center;