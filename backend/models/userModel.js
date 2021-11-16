const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

const User = function (user) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.image = user.image;
    this.role = user.role;
    this.password = user.password;
};

User.emailValidation = async (email) => {
    try {
        let status = '';
        let message = '';
        let request = await sql.connect(dbConfig);

        var existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingUser.recordset.length > 0) {
            status = 'failed';
            message = 'Email address has been already taken. Please change.'
            return ({ status, message });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.login = async (email, password) => {
    try {
        let request = await sql.connect(dbConfig);

        var existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");
        
        var secretToken = existingUser.recordset[0].iduser + '_' + existingUser.recordset[0].email + '_' + new Date().getTime();
        if (existingUser.recordset.length > 0) {
            const isVerified = passwordHash.verify(password, existingUser.recordset[0].password);
            if (isVerified) {       //proveri password i ako je dobar dodeli mu token
                const token = jwt.sign({ id: existingUser.recordset[0].iduser, role: existingUser.recordset[0].role }, secretToken);

                return ({ status: 'success', token: token, id: existingUser.recordset[0].iduser });
            } else {
                return ({ status: 'failed' });
            }
        }
        return ({ status: 'failed' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
}

module.exports = User;