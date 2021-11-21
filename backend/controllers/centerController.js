const Center = require('../models/centerModel');
const MailDelivery = require('../models/mailDeliveryModel');

exports.validation = async (req, res) => {
    try {
        const { status, message } = await Center.validation(req.query.name, req.query.email);
        res.send({ status: status, message: message });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.registration = async (req, res) => {
    try {
        const center = JSON.parse(req.query.center);
        const user = JSON.parse(req.query.user);
        let areaCode = '';
        let phoneNumber = '';

        if (typeof center.phoneNumber !== 'undefined') {
            areaCode = center.areaCode;
            phoneNumber = center.phoneNumber;
        }

        const { status } = await Center.registration(user, center, areaCode, phoneNumber);
        if (status === 'success') {
            const result = MailDelivery.sendRegistrationToUser(user, center.name);
            if (result) {
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