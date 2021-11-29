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

exports.saveAndSendSchedule = async (req, res) => {
    try {
        var newSchedule = [];
        var oldSchedule = [];
        var statusAdd, messageAdd, statusUpdate, messageUpdate = ''

        req.query.schedule.map(data => {
            const schedule = JSON.parse(data);
            if (typeof schedule.idAppointment === 'undefined') {
                newSchedule.push(schedule);
            } else {
                oldSchedule.push(schedule);
            }
        });

        if (newSchedule.length > 0) {
            //ubaci u bazu i informisi korisnike i nastavnike
            const { addStatus } = await Admin.addSchedule(req.user.id, newSchedule);
            if (addStatus === 'success') {
                //preuzmi mailove nasavnika i roditelja
                const { teacherStatus, teacherEmails } = await Admin.getTeachersEmails(newSchedule);
                const { parentStatus, childrensSchedule } = await Admin.getParentEmails(newSchedule);
                if (teacherStatus === 'success' && parentStatus === 'success') {
                    //obavesti nastavnike i roditelje
                    MailDelivery.sendScheduleToTeachers(teacherEmails);
                    MailDelivery.sendScheduleToParent(childrensSchedule);

                    statusAdd = teacherStatus;
                    messageAdd = 'Teachers and parents are informed.';
                } else {
                    statusAdd = teacherStatus;
                    messageAdd = 'Something went wrong. Please try again.';
                }
            } else {
                statusAdd = addStatus;
                messageAdd = 'Something went wrong. Please try again.';
            }
        }

        if (oldSchedule.length > 0) {
            //updejtuj ili izbrisi
            const { updateStatus, updateMessage } = await Admin.updateSchedule(oldSchedule);

            if (updateStatus === 'success') {
                const { teacherStatus, teacherEmails } = await Admin.getTeachersEmails(oldSchedule);
                const { parentStatus, childrensSchedule } = await Admin.getParentEmails(oldSchedule);
                if (teacherStatus === 'success' && parentStatus === 'success') {
                    //obavesti roditelje i nastvanike
                    MailDelivery.sendScheduleToTeachers(teacherEmails);
                    MailDelivery.sendScheduleToParent(childrensSchedule);

                    statusUpdate = updateStatus;
                    messageUpdate = updateMessage;
                } else {
                    statusUpdate = updateStatus;
                    messageUpdate = 'Something went wrong. Please try again.';
                }
            }
        }

        res.send({ statusAdd: statusAdd, messageAdd: messageAdd, statusUpdate: statusUpdate, messageUpdate: messageUpdate })
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.schedule = async (req, res) => {
    try {
        const { appointments } = await Admin.schedule(req.user.id);
        res.send({ appointments: appointments })
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.searchTeacher = async (req, res) => {
    try {
        const { status, teacher } = await Admin.searchTeacher(req.user.id, req.query.fullName);
        res.send({ status: status, teacher: teacher });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.getTeacherData = async (req, res) => {
    try {
        const { status, teacher, appointments } = await Admin.getTeacherData(req.query.teacherId);
        res.send({ status: status, teacher: teacher, appointments: appointments });
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};

exports.saveAndSendEstimate = async (req, res) => {
    try {
        const { status, parentEmail, childName } = await Admin.saveAndSendEstimate(req.user.id, req.query.childId, req.query.estimate);
        if(status === 'success'){
            //salji mail roditelju sa procenom i linkom da pogledaju dijagram dnevnih izvestaja u roku od mesec dana
            //i dijagram procene
            console.log(parentEmail);
            console.log(childName);
            res.send({ status: status });
        }else{
            res.send({ status: status });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failed' });
    }
};