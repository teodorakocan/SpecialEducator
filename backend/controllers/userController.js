const User = require('../models/userModel');

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
        res.header('auth-token', token).send({status: status, token: token});
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' })
    }
}