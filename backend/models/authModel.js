var passwordHash = require('password-hash');
var User = require('../models/userModel');
const { poolPromise } = require('./db');

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
        const request = await poolPromise;

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
        const request = await poolPromise;

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
            const request = await poolPromise;

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
        const request = await poolPromise;
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
        const request = await poolPromise;
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
        const request = await poolPromise;

        var mySchedule = await request.request()
            .query("SELECT * FROM appointment WHERE idUser=" + id + ";");

        if (mySchedule.recordset.length > 0) {
            return ({ status: 'success', mySchedule: mySchedule.recordset });
        } else {
            return ({ status: 'failed' })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.allChildren = async (id) => {
    try {
        const request = await poolPromise;

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
        const request = await poolPromise;
        var childName = [];

        var teacher = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + teacherId + ";");
        var children = await request.request()
            .query("SELECT * FROM child WHERE idCenter=" + teacher.recordset[0].idCenter + ";");

        if (children.recordset.length > 0) {
            if (fullName === '') {
                return ({ status: 'success', child: children.recordset })
            } else if (fullName.indexOf(' ') >= 0) {
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
        const request = await poolPromise;

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
        const request = await poolPromise;

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

Authenticated.checkIfDailyReportAllreadyExist = async (childId) => {
    try {
        const request = await poolPromise;
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const nowDate = nowDateAndTime.split(' ');
        var exist = false;

        var dailyReports = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + parseInt(childId) + ";");

        if (dailyReports.length > 0) {
            dailyReports.recordset.forEach(dailyReport => {
                const dailyReportDateAndTime = new Date(dailyReport.date).toISOString().slice(0, 19).replace('T', ' ');
                const dailyReortDate = dailyReportDateAndTime.split(' ');

                if (dailyReortDate[0] === nowDate[0]) {
                    exist = true;
                }
            });
        }

        return exist;
    } catch (err) {
        console.log(err);
        return false;
    }
};

Authenticated.sendAndSaveDailyReport = async (childId, teacherId, report) => {
    try {
        const request = await poolPromise;
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const result = await Authenticated.checkIfDailyReportAllreadyExist(childId);
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
        const request = await poolPromise;

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
        const request = await poolPromise;

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
        const request = await poolPromise;

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

Authenticated.listOfChildsEstimates = async (childId) => {
    try {
        const request = await poolPromise;

        var childsEstimates = await request.request()
            .query("SELECT * FROM estimate WHERE idChild=" + childId + ";");

        return ({ status: 'success', childsEstimates: childsEstimates.recordset });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.searchDailyReport = async (date) => {
    try {
        const request = await poolPromise;

        var dailyReports = await request.request()
            .query("SELECT * FROM dailyreport;");
        var serachedDailyReport = [];


        dailyReports.recordset.forEach((dailyReport) => {
            const dailyReportDateAndTime = new Date(dailyReport.date).toISOString().slice(0, 19).replace('T', ' ');
            const dailyReportDate = dailyReportDateAndTime.split(' ');

            if (dailyReportDate[0] === date) {
                serachedDailyReport.push(dailyReport);
            }
        });

        return ({ status: 'success', dailyReport: serachedDailyReport })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.searchEstimate = async (date) => {
    try {
        const request = await poolPromise;

        var estimates = await request.request()
            .query("SELECT * FROM estimate;");
        var serachedEstimate = [];


        estimates.recordset.forEach((estimate) => {
            const estimateDateAndTime = new Date(estimate.date).toISOString().slice(0, 19).replace('T', ' ');
            const estimateDate = estimateDateAndTime.split(' ');

            if (estimateDate[0] === date) {
                serachedEstimate.push(estimate);
            }
        });

        return ({ status: 'success', estimate: serachedEstimate })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getDailyReportById = async (dailyReportId) => {
    try {
        const request = await poolPromise;

        var dailyReport = await request.request()
            .query("SELECT * FROM dailyreport WHERE idDailyReport=" + dailyReportId + ";");

        return ({ status: 'success', dailyReport: dailyReport.recordset })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getEstimateById = async (estimateId) => {
    try {
        const request = await poolPromise;

        var estimate = await request.request()
            .query("SELECT * FROM estimate WHERE idEstimate=" + estimateId + ";");

        return ({ status: 'success', estimate: estimate.recordset })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getGradesOfDailyReports = async (childId) => {
    try {
        var monthlyDailyReport = [];
        const noWDateAndTime = new Date();
        const noWMonth = noWDateAndTime.getMonth();

        const request = await poolPromise;

        var dailyReports = await request.request()
            .query("SELECT * FROM dailyreport WHERE idChild=" + parseInt(childId) + ";");

        dailyReports.recordset.map((dailyReport) => {
            var dailyReportDateAndTime = new Date(dailyReport.date);
            var dailyReportMonth = dailyReportDateAndTime.getMonth();

            if (noWMonth === dailyReportMonth) {
                monthlyDailyReport.push(dailyReport);
            }
        });

        return ({ status: 'success', dailyReports: monthlyDailyReport })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getGradesOfEstimates = async (childId) => {
    try {
        var annualEstimates = [];
        const noWDateAndTime = new Date();
        const noWYear = noWDateAndTime.getFullYear();

        const request = await poolPromise;

        var estimates = await request.request()
            .query("SELECT * FROM estimate WHERE idChild=" + parseInt(childId) + ";");

        estimates.recordset.map((estimate) => {
            var estimateDateAndTime = new Date(estimate.date);
            var estimateYear = estimateDateAndTime.getFullYear();

            if (noWYear === estimateYear) {
                annualEstimates.push(estimate);
            }
        });

        return ({ status: 'success', estimates: annualEstimates })

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.changeChildData = async (child, childId) => {
    try {
        const request = await poolPromise;

        await request.request().query("UPDATE child SET name='" + child.name + "', lastName='" + child.lastName +
            "', dateOfBirth='" + child.dateOfBirth + "', category='" + child.category + "', degreeOfDisability='" + child.degreeOfDisability
            + "', weight=" + child.weight + ", height=" + child.height + " WHERE idChild = " + parseInt(childId) + ";");

        const message = "Child's data are changed successfully."
        return ({ status: 'success', message: message });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getParentData = async (childId) => {
    try {
        const request = await poolPromise;
        var child = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + childId + ";");

        var parent = await request.request()
            .query("SELECT * FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");

        return ({ status: 'success', parent: parent.recordset[0] });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.deleteAccount = async (userId, role) => {
    try {
        const request = await poolPromise;
        var teacher = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + userId + ";");

        if (role === 'admin') {
            var child = await request.request()
                .query("SELECT * FROM child WHERE idCenter=" + teacher.recordset[0].idCenter + ";");

            if (child.recordset.length > 0) {
                await request.request()
                    .query("DELETE FROM child WHERE idChild=" + child.recordset[0].idChild + ";");
                await request.request()
                    .query("DELETE FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");
                await request.request()
                    .query("DELETE FROM anamnesis WHERE idAnamnesis=" + child.recordset[0].idAnamnesis + ";");
                await request.request()
                    .query("DELETE FROM estimate WHERE idChild=" + child.recordset[0].idChild + ";");
                await request.request()
                    .query("DELETE FROM appointment WHERE idChild=" + child.recordset[0].idChild + ";");
                await request.request()
                    .query("DELETE FROM dailyreport WHERE idUser=" + userId + ";");
            }

            await request.request()
                .query("DELETE FROM [User] WHERE idCenter=" + teacher.recordset[0].idCenter + ";");
            await request.request()
                .query("DELETE FROM center WHERE idCenter=" + teacher.recordset[0].idCenter + ";");
        } else {
            await request.request()
                .query("DELETE FROM [User] WHERE idCenter=" + teacher.recordset[0].idCenter + ";");
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.getChildAnamnesis = async (childId) => {
    try {
        const request = await poolPromise;

        var child = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + parseInt(childId) + ";");

        var anamnesis = await request.request()
            .query("SELECT * FROM anamnesis WHERE idAnamnesis=" + child.recordset[0].idAnamnesis + ";");

        return ({ status: 'success', anamnesis: anamnesis.recordset[0] });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Authenticated.checkIfItIsTimeForFirstEstimate = async (childId) => {
    try {
        const request = await poolPromise;

        var estimate = await request.request()
            .query("SELECT * FROM estimate WHERE idChild=" + parseInt(childId) + ";");

        if (estimate.recordset.length > 0) {
            return ({ status: 'failed' });
        } else {
            return ({ status: 'success' });
        }

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Authenticated;