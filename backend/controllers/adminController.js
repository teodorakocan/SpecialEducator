const Admin = require('../models/adminModel');
const MailDelivery = require('../models/mailDeliveryModel');

exports.changeCenterData = async (req, res) => {
    try {
        const center = JSON.parse(req.query.center);
        let areaCode = '';
        let phoneNumber = '';

        if (typeof center.phoneNumber !== 'undefined') {
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
            const result = MailDelivery.sendNewUserEmail(user);
            if (result) {
                res.send({ status: 'failed' });
            } else {
                const portalMessage = 'New member, ' + user.name + ' ' + user.lastName + ', is added in your center.';
                res.send({ status: status, message: portalMessage });
            }
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
            const result = MailDelivery.sendParentEmail(child, parent);
            if (result) {
                res.send({ status: 'failed' });
            } else {
                const portalMessage = 'Child ' + child.name + ' ' + child.lastName + ' is added in center.';
                res.send({ status: status, message: portalMessage });
            }
        } else {
            res.send({ status: 'failed' });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.allUsers = async (req, res) => {
    try {
        const { status, users } = await Admin.allUsers(req.user.id);
        res.send({ status: status, users: users });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.allChildren = async (req, res) => {
    try {
        const { status, children } = await Admin.allChildren(req.user.id);
        res.send({ status: status, children: children });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.saveAndSendSchedule = async (req, res) => {
    try {
        const { statusSave } = await Admin.saveSchedule(req.query.schedule);

        if (statusSave === 'success') {
            const { teacherStatus, teacherEmails } = await Admin.getTeachersEmails(req.query.schedule);

            if (teacherStatus === 'success') {
                //const result = MailDelivery.sendScheduleToTeachers(teacherEmails);

                /*if (result) {
                    res.send({ status: 'failed' });
                } else {*/
                const { parentStatus, childrensSchedule } = await Admin.getParentEmails(req.query.schedule);

                if (parentStatus === 'success') {
                    //const result = MailDelivery.sendScheduleToParent(childrensSchedule);

                    res.send({ status: 'success' });
                } else {
                    res.send({ status: parentStatus });
                }
                //}
            } else {
                res.send({ status: teacherStatus });
            }
        } else {
            res.send({ status: statusSave });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};