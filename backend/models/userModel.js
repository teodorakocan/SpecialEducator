const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var randomstring = require('randomstring');

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
        let request = await sql.connect(dbConfig);

        var existingUser = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingUser.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
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

        if (existingUser.recordset.length > 0) {
            const isVerified = passwordHash.verify(password, existingUser.recordset[0].password);

            if (isVerified) {       //proveri password i ako je dobar dodeli mu token
                const token = jwt.sign({ id: existingUser.recordset[0].idUser, role: existingUser.recordset[0].role }, secretToken);

                return ({ status: 'success', token: token });
            } else {
                return ({ status: 'failed' });
            }
        }
        return ({ status: 'failed' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

User.resetPasswordRequest = async (email) => {
    try {
        let request = await sql.connect(dbConfig);
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
        let request = await sql.connect(dbConfig);

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

        let request = await sql.connect(dbConfig);

        var dailyReports = await request.request()
            .query("SELECT * FROM dailyreport WHERE idChild=" + parseInt(childId) + ";");

        dailyReports.recordset.map((dailyReport) => {
            var dailyReportDateAndTime = new Date(dailyReport.date);
            var dailyReportMonth = dailyReportDateAndTime.getMonth();

            if(noWMonth === dailyReportMonth){
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

        let request = await sql.connect(dbConfig);

        var estimates = await request.request()
            .query("SELECT * FROM estimate WHERE idChild=" + parseInt(childId) + ";");

            estimates.recordset.map((estimate) => {
            var estimateDateAndTime = new Date(estimate.date);
            var estimateYear = estimateDateAndTime.getFullYear();

            if(noWYear === estimateYear){
                annualEstimates.push(estimate);
            }
        });

        return ({ status: 'success', estimates: annualEstimates });

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = User;