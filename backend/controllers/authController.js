const Authentiated = require('../models/authModel');

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
    try{
        const { status, center } = await Authentiated.centerData(req.user.id);
        res.send({ status: status, center: center });
    }catch(err){
        console.log(err);
        res.send({status: 'failed'});
    }
};

exports.mySchedule = async (req, res) => {
    try{
        const { status, mySchedule } = await Authentiated.mySchedule(req.user.id);
        res.send({ status: status, mySchedule: mySchedule });
    }catch(err){
        console.log(err);
        res.send({status: 'failed'});
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