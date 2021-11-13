const { query } = require('express');
const Authentiated = require('../models/authenticatedModel');

exports.data = async (req, res) => {
    try {
        const { status, user } = await Authentiated.data(req.user.id);
        res.send({ status: status, user: user });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.changeData = async (req, res) => {
    try {
        const userChange = JSON.parse(req.query.user)
        const { status, message } = await Authentiated.changeData(userChange);
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