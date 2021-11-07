const Center = require('../models/centerModel');

exports.validation = async (req, res) => {
    try {
        const { status, message } = await Center.validation(req.query.name, req.query.email);
        res.send({ status: status, message: message }); //ako nema vraca null
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

        if (center.areaCode === 'undefined') {
            areaCode = null;
            phoneNumber = null;
        }

        const { status, message } = await Center.registration(user, center, areaCode, phoneNumber);
        res.send({ status: status, message: message }); //ako nema vraca null
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
}