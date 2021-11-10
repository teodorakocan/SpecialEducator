const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

const Authenticated = function (user) {
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.image = user.image;
    this.role = user.role;
    this.password = user.password;
};

Authenticated.data = async (id) => {
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
}

module.exports = Authenticated;