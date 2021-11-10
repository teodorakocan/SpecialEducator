const Authentiated = require('../models/authenticatedModel');

exports.data = async (req, res) => {
    try {
        const { status, user } = await Authentiated.data(req.user.id);
        res.send({ status: status, user: user });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
}