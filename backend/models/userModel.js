var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var randomstring = require('randomstring');
const { poolPromise } = require('./db');

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
        const request = await poolPromise;
        const existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingUser.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
        } else {
            return ({ status: 'success' });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.login = async (email, password) => {
    try {
        const request = await poolPromise;

        var existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingUser.recordset.length > 0) {
            const isVerified = passwordHash.verify(password, existingUser.recordset[0].password);

            if (isVerified) {       //proveri password i ako je dobar dodeli mu token
                const hashedRole = passwordHash.generate(existingUser.recordset[0].role);
                const token = jwt.sign({ id: existingUser.recordset[0].idUser, role: hashedRole }, secretToken);

                return ({ status: 'success', token: token });
            } else {
                return ({ status: 'failed' });
            }
        } else {
            return ({ status: 'failed' });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.resetPasswordRequest = async (email) => {
    try {
        const request = await poolPromise;
        var message = '';

        var existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingUser.recordset.length > 0) {
            const code = randomstring.generate({ lenght: 15 });
            const rt = Date.now(); //request time
            const time = new Date(rt);

            const requestTime = time.getFullYear() + '' + time.getMonth() + '' + time.getDate() + '$'
                + time.getHours() + '' + time.getMinutes() + '' + time.getSeconds();

            const resetCode = code + '_' + existingUser.recordset[0].idUser + '_' + requestTime;

            await request.request().query("UPDATE [User] SET resetCode = '" + resetCode + "' WHERE email = '" + email + "';");
            message = 'Email with reset link was sent on your email address, ' + email + '. Code will expire in one hour.';
            return ({ status: 'success', resetCode: resetCode, message: message });
        } else {
            message = "User with this email address isn't register on app";
            return ({ status: 'failed', message: message });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.resetPassword = async (password, resetCode) => {
    try {
        const request = await poolPromise;

        var existingCode = await request.request()
            .query("SELECT * FROM [User] WHERE resetCode='" + resetCode + "';");

        if (existingCode.recordset.length > 0) {
            const hashedPassword = passwordHash.generate(password);
            const userId = resetCode.split('_');

            await request.request().query("UPDATE [User] SET password = '" + hashedPassword + "', resetCode='NULL' WHERE idUser = " + userId[1] + ";");
            return ({ status: 'success' });
        } else {
            const message = 'Invalid reset code';
            return ({ status: 'failed', message: message });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.diagramMonthlyDailyReport = async (childId) => {
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

User.diagramAnnualEstimate = async (childId) => {
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

        return ({ status: 'success', estimates: annualEstimates });

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.checkParentPassword = async (childId, password) => {
    try {
        var child = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + parseInt(childId) + ";");

        var parent = await request.request()
            .query("SELECT * FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");

        const isVerified = passwordHash.verify(password, parent.recordset[0].password);
        if (isVerified){
            return ({ status: 'success' });
        }else{
            return ({ status: 'failed' });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = User;