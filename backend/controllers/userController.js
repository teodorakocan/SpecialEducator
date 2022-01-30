const User = require('../models/userModel');
const MailDelivery = require('../models/mailDeliveryModel');

exports.emailValidation = async (req, res) => {
    try {
        const { status, message } = await User.emailValidation(req.query.email);
        res.send({ status: status, message: message });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { status, token } = await User.login(req.query.email, req.query.password);
        res.header('auth-token', token).send({ status: status, token: token });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' })
    }
};

exports.resetPasswordRequest = async (req, res) => {
    try {
        const { status, resetCode, message } = await User.resetPasswordRequest(req.query.email);
        if (status === 'success') {
            const result = MailDelivery.sendResetPasswordLink(resetCode, req.query.email)
            if (result) {
                res.send({ status: 'failed' });
            } else {
                res.send({ status: status, message: message });
            }
        } else {
            res.send({ status: 'failed', message: message });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const now = new Date(Date.now());
        const resetCode = req.query.resetCode.split('_');
        const requestDate = resetCode[2].split('$');
        const nowDate = now.getFullYear() + '' + now.getMonth() + '' + now.getDate();
        const nowTime = now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
        if (nowDate === requestDate[0]) {
            const result = parseInt(nowTime) - parseInt(requestDate[1]);
            if (result > 10000 || result < 0) {
                res.send({ status: 'failed', message: 'Code expired.' });
            } else {
                const { status, message } = await User.resetPassword(req.query.password, req.query.resetCode);
                res.send({ status: status, message: message });
            }

        } else {
            res.send({ status: 'failed', message: 'Code expired.' });
        }

    } catch (err) {
        console.log(err);
        res.send({ status: 'failed', message: 'Server failed' });
    }
};

exports.diagramMonthlyDailyReport = async (req, res) => {
    try {
        const { status, dailyReports } = await User.diagramMonthlyDailyReport(req.query.childId);
        res.send({ status: status, dailyReports: dailyReports });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed', message: 'Server failed' });
    }
};

exports.diagramAnnualEstimate = async (req, res) => {
    try {
        const { status, estimates } = await User.diagramAnnualEstimate(req.query.childId);
        res.send({ status: status, estimates: estimates });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed', message: 'Server failed' });
    }
};

exports.checkParentPassword = async (req, res) => {
    try {
        const { status } = await User.checkParentPassword(req.query.childId, req.query.password);
        res.send({ status: status });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed', message: 'Server failed' });
    }
};