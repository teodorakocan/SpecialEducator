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
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

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
            .query("SELECT * FROM [User] WHERE idUser=" + user.idUser + ";");

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

            await request.request().query("UPDATE [User] SET name = '" + user.name + "', lastName ='" + user.lastName +
                "', email ='" + user.email + "' WHERE idUser = " + user.idUser + ";");
            return ({ status: 'success', message: 'You have successfully changed your profile information.' });
        } else {
            return ({ status: 'failed' });
        }
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

            await request.request().query("UPDATE [User] SET password = '" + hashedPassword + "' WHERE idUser = " + userId + ";");
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
            .query("UPDATE [User] SET image = '" + imageName + "' WHERE idUser = " + id + ";");

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
            .query("SELECT * FROM center WHERE idCenter=" + user.idCenter + ";");

        if (centerData.recordset.length > 0) {
            return ({ status: 'success', center: centerData.recordset[0] });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.mySchedule = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var mySchedule = await request.request()
            .query("SELECT * FROM appointment WHERE idUser=" + id + ";");

        if (mySchedule.recordset.length > 0) {
            return ({ status: 'success', mySchedule: mySchedule.recordset });
        } else {
            return ({ status: 'false' })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.allChildren = async (id) => {
    try {
        let request = await sql.connect(dbConfig);

        var employee = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        if (employee.recordset.length > 0) {
            var children = await request.request()
                .query("SELECT * FROM child WHERE idCenter=" + employee.recordset[0].idCenter + ";");
        }
        return ({ status: 'success', children: children.recordset });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.searchChild = async (teacherId, fullName) => {
    try {
        let request = await sql.connect(dbConfig);
        var childName = [];

        var teacher = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + teacherId + ";");
        var children = await request.request()
            .query("SELECT * FROM child WHERE idCenter=" + teacher.recordset[0].idCenter + ";");

        if (children.recordset.length > 0) {
            if (fullName.indexOf(' ') >= 0) {
                childName = fullName.split(' ');

                var firstSearchCombination = await request.request()
                    .query("SELECT * FROM child WHERE name='" + childName[0] + "' AND lastName='" + childName[1] + "';");

                if (firstSearchCombination.recordset.length == 0) {
                    var secondSearchCombination = await request.request()
                        .query("SELECT * FROM child WHERE name='" + childName[1] + "' AND lastName='" + childName[0] + "';");

                    return ({ status: 'success', child: secondSearchCombination.recordset });
                } else {
                    return ({ status: 'success', child: firstSearchCombination.recordset })
                }
            } else {
                var firstSearchCombination = await request.request()
                    .query("SELECT * FROM child WHERE name='" + fullName + "';");

                if (firstSearchCombination.recordset.length == 0) {
                    var secondSearchCombination = await request.request()
                        .query("SELECT * FROM child WHERE lastName='" + fullName + "';");

                    return ({ status: 'success', child: secondSearchCombination.recordset });
                } else {
                    return ({ status: 'success', child: firstSearchCombination.recordset })
                }
            }
        } else {
            return ({ status: 'failed', child: children.recordset })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getChildData = async (childId) => {
    try {
        let request = await sql.connect(dbConfig);

        var childData = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + childId + ";");

        var appointments = await request.request()
            .query("SELECT * FROM appointment WHERE idChild=" + childId + ";");

        return ({ status: 'success', child: childData.recordset, appointments: appointments.recordset })
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.allTeachers = async (teacherId) => {
    try {
        let request = await sql.connect(dbConfig);

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + teacherId + ";");

        if (userData.recordset.length > 0) {
            var users = await request.request()
                .query("SELECT * FROM [User] WHERE idCenter='" + userData.recordset[0].idCenter + "';");
        }

        return ({ status: 'success', users: users.recordset });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.checkIfDailyReportAllreadyExist = async () => {
    try {
        let request = await sql.connect(dbConfig);
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const nowDate = nowDateAndTime.split(' ');
        var exist = false;

        var daiyReports = await request.request()
            .query("SELECT * FROM dailyreport;");

        daiyReports.recordset.forEach(daiyReport => {
            const dealyReportDateAndTime = new Date(daiyReport.date).toISOString().slice(0, 19).replace('T', ' ');
            const dailyReortDate = dealyReportDateAndTime.split(' ');

            if (dailyReortDate[0] === nowDate[0]) {
                exist = true;
            }
        });

        return exist;
    } catch (err) {
        console.log(err);
        return false;
    }
};

Authenticated.sendAndSaveDailyReport = async (childId, teacherId, report) => {
    try {
        let request = await sql.connect(dbConfig);
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const result = await Authenticated.checkIfDailyReportAllreadyExist();
        if (result) {
            return ({ status: 'failed' });
        } else {
            var teacher = await request.request()
                .query("SELECT * FROM [User] WHERE idUser=" + teacherId + ";");
            var teacherName = teacher.recordset[0].name + ' ' + teacher.recordset[0].lastName;

            await request.request()
                .query("INSERT INTO dailyreport (report, recommendationForTeacher, recommendationForParent, progress, problems, mark, date, idChild, idUser) VALUES ('" +
                    report.report + "', '" + report.recommendationForTeacher + "', '" + report.recommendationForParent + "', '" + report.progress + "', '" +
                    report.problems + "', " + report.mark + ", '" + nowDateAndTime + "', " + parseInt(childId) + ", " + teacherId + ");");

            var child = await request.request()
                .query("SELECT * FROM child WHERE idChild=" + parseInt(childId) + ";");
            var childName = child.recordset[0].name + ' ' + child.recordset[0].lastName;

            var childParent = await request.request()
                .query("SELECT * FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");

            return ({ status: 'success', parentEmail: childParent.recordset[0].email, childName: childName, teacherName: teacherName });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.listOfChildsDailyReports = async (childId) => {
    try {
        let request = await sql.connect(dbConfig);

        var childsDailyReports = await request.request()
            .query("SELECT * FROM dailyreport WHERE idChild=" + childId + ";");

        return ({ status: 'success', childsDailyReports: childsDailyReports.recordset });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.deleteDailyReport = async (reportId) => {
    try {
        let request = await sql.connect(dbConfig);

        await request.request()
            .query("DELETE FROM dailyreport WHERE idDailyReport=" + reportId + ";");

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.deleteMarkedDailyReports = async (reports) => {
    try {
        let request = await sql.connect(dbConfig);

        reports.map(async (report) => {
            await request.request()
                .query("DELETE FROM dailyreport WHERE idDailyReport=" + report + ";");
        })
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Authenticated;