const Authentiated = require('../models/authModel');
const MailDelivery = require('../models/mailDeliveryModel');

exports.userData = async (req, res) => {
    try {
        const { status, user } = await Authentiated.userData(req.user.id);
        res.send({ status: status, user: user });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.changeUserData = async (req, res) => {
    try {
        const userChange = JSON.parse(req.query.user)
        const { status, message } = await Authentiated.changeUserData(userChange);
        res.send({ status: status, message: message });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { status, message } = await Authentiated.changePassword(req.user.id, req.query.newPassword, req.query.oldPassword);
        res.send({ status: status, message: message });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.changeImage = async (req, res) => {
    try {
        const { status } = await Authentiated.changeImage(req.user.id);
        res.send({ status: status });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
}

exports.centerData = async (req, res) => {
    try {
        const { status, center } = await Authentiated.centerData(req.user.id);
        res.send({ status: status, center: center });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.mySchedule = async (req, res) => {
    try {
        const { status, mySchedule } = await Authentiated.mySchedule(req.user.id);
        res.send({ status: status, mySchedule: mySchedule });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.allChildren = async (req, res) => {
    try {
        const { status, children } = await Authentiated.allChildren(req.user.id);
        res.send({ status: status, children: children });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.searchChild = async (req, res) => {
    try {
        const { status, child } = await Authentiated.searchChild(req.user.id, req.query.fullName);
        res.send({ status: status, child: child });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.getChildData = async (req, res) => {
    try {
        const { status, child, appointments } = await Authentiated.getChildData(req.query.childId);
        res.send({ status: status, child: child, appointments: appointments });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.allTeachers = async (req, res) => {
    try {
        const { status, users } = await Authentiated.allTeachers(req.user.id);
        res.send({ status: status, users: users });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.checkIfDailyReportAllreadyExist = async (req, res) => {
    try {
        const result = await Authentiated.checkIfDailyReportAllreadyExist();
        if (result) {
            res.send({ status: 'success', message: 'Daily report for this day is already added.' });
        } else {
            res.send({ status: 'failed' });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.sendAndSaveDailyReport = async (req, res) => {
    try {
        const report = JSON.parse(req.query.report);
        const { status, parentEmail, childName, teacherName } = await Authentiated.sendAndSaveDailyReport(req.query.childId, req.user.id, report);

        if (status === 'success') {
            if (MailDelivery.sendToParentDailyReport(parentEmail, report, childName, teacherName)) {
                res.send({ status: 'failed' });
            } else {
                res.send({ status: status });
            }
        } else {
            res.send({ status: status });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.listOfChildsDailyReports = async (req, res) => {
    try {
        const { status, childsDailyReports } = await Authentiated.listOfChildsDailyReports(req.query.childId);
        res.send({ status: status, childsDailyReports: childsDailyReports });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.deleteDailyReport = async (req, res) => {
    try {
        const { status } = await Authentiated.deleteDailyReport(req.query.reportId);
        res.send({ status: status });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.deleteMarkedDailyReports = async (req, res) => {
    try {
        const { status } = await Authentiated.deleteMarkedDailyReports(req.query.reports);
        res.send({ status: status });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.getTeacherRole = async (req, res) => {
    try {
        res.send({ status: 'success', role: req.user.role });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};