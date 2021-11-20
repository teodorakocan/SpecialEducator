const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var passwordHash = require('password-hash');

const Admin = function (admin) {
    this.name = admin.name;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.image = admin.image;
    this.role = admin.role;
    this.password = admin.password;
};

Admin.changeCenterData = async (id, center, areaCode, phoneNumber) => {
    try {
        let request = await sql.connect(dbConfig);

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (userData.recordset.length > 0) {
            const centerData = await request.request()
                .query("SELECT * FROM center WHERE idCenter='" + userData.recordset[0].idCenter + "';");

            if (centerData.recordset[0].email !== center.email) {
                const { status, message } = await Admin.validationCenterEmail(center.email);
                if (status === 'failed') {
                    return ({ status: status, message: message })
                }
            }

            if (centerData.recordset[0].name !== center.name) {
                const { status, message } = await Admin.validationCenterName(center.name);
                if (status === 'failed') {
                    return ({ status: status, message: message })
                }
            }

            await request.request()
                .query("UPDATE center SET name = '" + center.name + "', address ='" + center.address +
                    "', addressNumber ='" + center.addressNumber + "', city ='" + center.city + "', email ='" + center.email +
                    "', phoneNumber ='" + phoneNumber + "', areaCode ='" + areaCode + "', state ='" + center.state +
                    "' WHERE idCenter = '" + userData.recordset[0].idCenter + "';");
            return ({ status: 'success', message: 'You have successfully changed your profile information.' });
        }

        return ({ status: 'failed' });

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationCenterName = async (name) => {
    try {
        let request = await sql.connect(dbConfig);

        var existingName = await request.request()
            .query("SELECT * FROM center WHERE name='" + name + "';");

        if (existingName.recordset.length > 0) {
            return ({ status: 'failed', message: 'Name of center is already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationCenterEmail = async (email) => {
    try {
        let request = await sql.connect(dbConfig);

        var existingEmail = await request.request()
            .query("SELECT * FROM center WHERE email='" + email + "';");

        if (existingEmail.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.addNewUser = async (id, user) => {
    try {
        let request = await sql.connect(dbConfig);

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (admin.recordset.length > 0) {
            const { status, message } = await Admin.validationUserEmail(user.email);
            if (status === 'success') {
                const hashedPassword = passwordHash.generate(user.password);

                await request.request()
                    .query("INSERT INTO [User] (name, lastName, email, image, role, password, resetCode, idCenter)"
                        + "VALUES ('" + user.name + "', '" + user.lastName + "', '" + user.email + "', '" + imageName
                        + "', '" + user.role + "', '" + hashedPassword + "', NULL, " + admin.recordset[0].idCenter + ");");

                return ({ status: 'success' });

            } else {
                return ({ status: status, message: message });
            }
        }

        return ({ status: 'failed' });

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationUserEmail = async (email) => {
    try {
        let request = await sql.connect(dbConfig);

        var existingEmail = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingEmail.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.addChild = async (id, child, parent, anamnesis, phoneNumber, areaCode) => {
    try {
        let request = await sql.connect(dbConfig);

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (admin.recordset.length > 0) {
            var childAnamnesis = await request.request()
                .query("INSERT INTO anamnesis (descriptionOfPregnancy, description, diagnosis, descriptionOfBehavior, descriptionOfChildBirth, iduser) VALUES ('" +
                    anamnesis.descriptionOfPregnancy + "', '" + anamnesis.description + "', '" + anamnesis.diagnosis +
                    "', '" + anamnesis.descriptionOfBehavior + "', '" + anamnesis.descriptionOfChildBirth +
                    "', " + id + "); SELECT SCOPE_IDENTITY() AS id");

            var anamnesisId = parseInt(childAnamnesis.recordset[0].id);

            var parents = await request.request()
                .query("SELECT * FROM parent WHERE email='" + parent.email + "';");
            var parentId = 0;

            if (parents.recordset.length > 0) {
                parentId = parents.recordset[0].idParent
            } else {
                var parentData = await request.request()
                    .query("INSERT INTO parent (name, lastName, email, phoneNumber, areaCode) VALUES ('" +
                        parent.name + "', '" + parent.lastName + "', '" + parent.email + "', '" + phoneNumber + "', '" + areaCode + "'); SELECT SCOPE_IDENTITY() AS id");
                parentId = parseInt(parentData.recordset[0].id);
            }

            await request.request()
                .query("INSERT INTO child (name, lastName, dateOfBirth, image, idCenter, idAnamnesis, idParent) VALUES ('" +
                    child.name + "', '" + child.lastName + "', '" + child.dateOfBirth + "', '" + imageName + "', " +
                    admin.recordset[0].idCenter + ", " + anamnesisId + ", " + parentId + ");");
        
            return ({ status: 'success' });
        }

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Admin;