const User = require('../models/userModel');
var mailCongig = require('../configurations/mailConfig');

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
        const { status, resetCode } = await User.resetPasswordRequest(req.query.email);
        if (status === 'success') {
            const emailMessage = '<Link to="http://localhost:3000/resetPassword?resetCode=' + resetCode + '"/>';
            const message = 'Email with reset link was sent on your email address, ' + req.query.email + '.';
            var mailOptionsCenter = {
                from: 'specialeducator2021@gmail.com',
                to: req.query.email,
                subject: 'Special Educator',
                text: emailMessage
            };

            mailCongig.sendMail(mailOptionsCenter, function (error, info) {
                if (error) {
                    res.send({ status: 'failed' });
                } else {
                    res.send({ status: 'success', message: message });
                }
            });
        } else {
            res.send({ status: 'failed' }); //email ne postoji u bazi (s tom greskom informisi korisnika na frontu)
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { status, message } = await User.resetPassword(req.query.password, req.query.resetCode);
        res.send({ status: status }); //email ne postoji u bazi (s tom greskom informisi korisnika na frontu)
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};