const Admin = require('../models/adminModel');
var mailConfig = require('../configurations/mailConfig');

exports.changeCenterData = async (req, res) => {
    try {
        const center = JSON.parse(req.query.center);
        let areaCode = '';
        let phoneNumber = '';

        if (center.areaCode === 'undefined') {
            areaCode = null;
            phoneNumber = null;
        } else {
            areaCode = center.areaCode;
            phoneNumber = center.phoneNumber;
        }

        const { status, message } = await Admin.changeCenterData(req.user.id, center, areaCode, phoneNumber);
        res.send({ status: status, message: message });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.addNewUser = async (req, res) => {
    try {
        const user = JSON.parse(req.query.user);

        const { status, message } = await Admin.addNewUser(req.user.id, user);
        if (status === 'success') {
            var mailOptionsCenter = {
                from: 'specialeducator2021@gmail.com',
                to: user.email,
                subject: 'Special Educator',
                text: 'Welcome. You are now signed up on aplication Special Educator with email/username: ' +
                    user.email + ' and password: ' + user.password + '.'
            };

            mailConfig.sendMail(mailOptionsCenter, function (error, info) {
                if (error) {
                    res.send({ status: 'failed' });
                } else {
                    const portalMessage = 'New member, ' + user.name + ' ' + user.lastName + ', is added in your center.';
                    res.send({ status: status, message: portalMessage });
                }
            });
        } else {
            res.send({ status: status, message: message });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.addChild = async (req, res) => {
    try {
        const child = JSON.parse(req.query.child);
        const parent = JSON.parse(req.query.parent);
        const anamnesis = JSON.parse(req.query.anamnesis)
        let areaCode = '';
        let phoneNumber = '';

        if (typeof parent.phoneNumber !== 'undefined') {
            areaCode = center.areaCode;
            phoneNumber = center.phoneNumber;
        }

        const { status } = await Admin.addChild(req.user.id, child, parent, anamnesis, phoneNumber, areaCode);
        if (status === 'success') {
            var mailOptionsCenter = {
                from: 'specialeducator2021@gmail.com',
                to: parent.email,
                subject: 'Special Educator',
                text: 'Welcome. Your child ' + child.name + ' ' + child.lastName + ' is sign up on application Special Educator.' +
                    'All information about your child will be sent to this email address.'
            };

            mailConfig.sendMail(mailOptionsCenter, function (error, info) {
                if (error) {
                    res.send({ status: 'failed' });
                } else {
                    const portalMessage = 'Child ' + child.name + ' ' + child.lastName + ' is added in center.';
                    res.send({ status: status, message: portalMessage });
                }
            });
        } else {
            res.send({ status: 'failed' });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};