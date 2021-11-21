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

Admin.allUsers = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (userData.recordset.length > 0) {
            var users = await request.request()
                .query("SELECT * FROM [User] WHERE idCenter='" + userData.recordset[0].idCenter + "';");
            return ({ status: 'success', users: users.recordset });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.allChildren = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var employee = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (employee.recordset.length > 0) {
            var children = await request.request()
                .query("SELECT * FROM child WHERE idCenter='" + employee.recordset[0].idCenter + "';");
            return ({ status: 'success', children: children.recordset });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.schedule = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var employee = await request.request()
            .query("SELECT * FROM [User] WHERE idUser='" + id + "';");

        if (employee.recordset.length > 0) {
            var children = await request.request()
                .query("SELECT * FROM child WHERE idCenter='" + employee.recordset[0].idCenter + "';");
            return ({ status: 'success', children: children.recordset });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.saveSchedule = async (schedule) => {
    try {
        let request = await sql.connect(dbConfig);
        schedule.forEach(async (date) => {
            const timeTable = JSON.parse(date);
            var scheduled = await request.request()
                .query("SELECT * FROM appointment WHERE startDate='" + timeTable.startDate + "' AND endDate='" +
                    timeTable.endDate + "' AND idUser=" + timeTable.teacherID + " AND idChild=" + timeTable.childID + ";");

            if (scheduled.recordset.length == 0) {
                await request.request()
                    .query("INSERT INTO appointment (endDate, startDate, text, description, idUser, idChild) VALUES ('" +
                        timeTable.endDate + "', '" + timeTable.startDate + "', '" + timeTable.text + "', '" + timeTable.description +
                        "', " + timeTable.teacherID + ", " + timeTable.childID + ");");
            }
        });

        return ({ statusSave: 'success' });
    } catch (err) {
        console.log(err);
        return ({ statusSave: 'failed' });
    }
};

Admin.getTeachersEmails = async (schedule) => {
    try {
        let request = await sql.connect(dbConfig);
        var teacherEmails = [];

        var teachers = await request.request()
            .query("SELECT * FROM [User];");

        schedule.forEach(data => {
            const timeTable = JSON.parse(data);
            var email = '';

            teachers.recordset.forEach(teacher => {
                if (!teacherEmails.some(email => email.email === teacher.email)) {
                    if (teacher.idUser == timeTable.teacherID) {
                        email = teacher.email;
                        teacherEmails.push({ email });
                    }
                }
            });
        });

        return ({ teacherStatus: 'success', teacherEmails: teacherEmails })
    } catch (err) {
        console.log(err);
        return ({ teacherStatus: 'failed' });
    }
};

Admin.getParentEmails = async (timeTable) => {
    try {
        let request = await sql.connect(dbConfig);
        var childrensSchedule = [];
        var childrensSchedule = [];

        var children = await request.request()
            .query("SELECT * FROM child;");
        var parents = await request.request()
            .query("SELECT * FROM parent;");

        timeTable.forEach(data => {
            const schedule = JSON.parse(data);

            parents.recordset.forEach(parent => {
                var emailInfo = {};
                var childInfo = {};

                emailInfo['parentEmail'] = parent.email;

                children.recordset.forEach(child => {
                    if (child.idChild == schedule.childID) {
                        if (parent.idParent == child.idParent) {
                            childInfo['childId'] = child.idChild;
                            childInfo['childName'] = child.name + ' ' + child.lastName;
                            emailInfo['childInfo'] = childInfo;

                            childrensSchedule.push(emailInfo);

                        }
                    }
                })
            });
        });

        childrensSchedule.forEach(information => {
            var appointmentInfo = {};
            var appointments = [];

            timeTable.forEach(data => {
                const schedule = JSON.parse(data);

                if (schedule.childID == information.childInfo.childId) {
                    var startDate = schedule.startDate.split('T');
                    var startTime = startDate[1].split(':');
                    var endDate = schedule.endDate.split('T');
                    var endTime = endDate[1].split(':');

                    appointmentInfo['description'] = schedule.description;
                    appointmentInfo['text'] = schedule.text;
                    appointmentInfo['startDate'] = startDate[0];
                    appointmentInfo['classDuration'] = startTime[0] + ':' + startTime[1] + '-' + endTime[0] + ':' + endTime[1];
                    appointments.push(appointmentInfo);
                }
                information['appointments'] = appointments;
            })
        })

        const uniquechildrensSchedule = childrensSchedule.filter((email, index) => {
            const _email = JSON.stringify(email);
            return index === childrensSchedule.findIndex(obj => {
              return JSON.stringify(obj) === _email;
            });
          });

        return ({ parentStatus: 'success', childrensSchedule: uniquechildrensSchedule })
    } catch (err) {
        console.log(err);
        return ({ parentStatus: 'failed' });
    }
};

module.exports = Admin;