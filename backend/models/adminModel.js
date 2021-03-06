var passwordHash = require('password-hash');
const { poolPromise } = require('./db');

const Admin = function (admin) {
    this.name = admin.name;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.image = admin.image;
    this.role = admin.role;
    this.password = admin.password;
};

Admin.changeCenterData = async (id, center, areaCode, phoneNumber) => {
    try {
        const request = await poolPromise;

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        if (userData.recordset.length > 0) {
            const centerData = await request.request()
                .query("SELECT * FROM center WHERE idCenter=" + userData.recordset[0].idCenter + ";");

            if (centerData.recordset[0].email !== center.email) {
                const { status, message } = await Admin.validationCenterEmail(center.email);
                if (status === 'failed') {
                    return ({ status: status, message: message })
                }
            }

            if (centerData.recordset[0].name !== center.name) {
                const { status, message } = await Admin.validationCenterName(center.name);
                if (status === 'failed') {
                    return ({ status: status, message: message })
                }
            }

            await request.request()
                .query("UPDATE center SET areaCode = '" + areaCode + "', address ='" + center.address +
                    "', addressNumber ='" + center.addressNumber + "', city ='" + center.city + "', email ='" + center.email +
                    "', name ='" + center.name + "', phoneNumber ='" + phoneNumber + "', state ='" + center.state +
                    "' WHERE idCenter = " + userData.recordset[0].idCenter + ";");
            return ({ status: 'success', message: 'You have successfully changed your profile information.' });
        }

        return ({ status: 'failed' });

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationCenterName = async (name) => {
    try {
        const request = await poolPromise;

        var existingName = await request.request()
            .query("SELECT * FROM center WHERE name='" + name + "';");

        if (existingName.recordset.length > 0) {
            return ({ status: 'failed', message: 'Name of center is already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationCenterEmail = async (email) => {
    try {
        const request = await poolPromise;

        var existingEmail = await request.request()
            .query("SELECT * FROM center WHERE email='" + email + "';");

        if (existingEmail.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.addNewUser = async (id, user) => {
    try {
        const request = await poolPromise;

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        if (admin.recordset.length > 0) {
            const { status, message } = await Admin.validationUserEmail(user.email);
            if (status === 'success') {
                const hashedPassword = passwordHash.generate(user.password);

                await request.request()
                    .query("INSERT INTO [User] (name, lastName, email, image, role, password, resetCode, idCenter)"
                        + "VALUES ('" + user.name + "', '" + user.lastName + "', '" + user.email + "', '" + imageName
                        + "', '" + user.role + "', '" + hashedPassword + "', NULL, " + admin.recordset[0].idCenter + ");");

                return ({ status: 'success' });

            } else {
                return ({ status: status, message: message });
            }
        } else {
            return ({ status: 'failed' });
        }

    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.validationUserEmail = async (email) => {
    try {
        const request = await poolPromise;

        var existingEmail = await request.request()
            .query("SELECT * FROM [User] WHERE email='" + email + "';");

        if (existingEmail.recordset.length > 0) {
            return ({ status: 'failed', message: 'Email address has been already taken. Please change.' });
        }
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.addChild = async (id, child, parent, anamnesis, phoneNumber, areaCode) => {
    try {
        const request = await poolPromise;

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        if (admin.recordset.length > 0) {
            var childAnamnesis = await request.request()
                .query("INSERT INTO anamnesis (descriptionOfPregnancy, description, diagnosis, descriptionOfBehavior, descriptionOfChildBirth, idUser) VALUES ('" +
                    anamnesis.descriptionOfPregnancy + "', '" + anamnesis.description + "', '" + anamnesis.diagnosis +
                    "', '" + anamnesis.descriptionOfBehavior + "', '" + anamnesis.descriptionOfChildBirth +
                    "', " + id + "); SELECT SCOPE_IDENTITY() AS id");

            var anamnesisId = parseInt(childAnamnesis.recordset[0].id);

            var parents = await request.request()
                .query("SELECT * FROM parent WHERE email='" + parent.email + "';");
            var parentId = 0;

            if (parents.recordset.length > 0) {
                parentId = parents.recordset[0].idParent
            } else {
                const hashedPassword = passwordHash.generate(parent.password);
                var parentData = await request.request()
                    .query("INSERT INTO parent (name, lastName, email, phoneNumber, areaCode, password) VALUES ('" +
                        parent.name + "', '" + parent.lastName + "', '" + parent.email + "', '" + phoneNumber +
                        "', '" + areaCode + "', '" + hashedPassword + "'); SELECT SCOPE_IDENTITY() AS id");
                parentId = parseInt(parentData.recordset[0].id);
            }

            const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

            await request.request()
                .query("INSERT INTO child (name, lastName, dateofBirth, dateOfReceipt, category, degreeOfDisability, weight, height, idCenter, idAnamnesis, idParent, image) VALUES ('" +
                    child.name + "', '" + child.lastName + "', '" + child.dateOfBirth + "', '" + nowDateAndTime +
                    "', '" + child.category + "', '" + child.degreeOfDisability + "', " + child.weight +
                    ", " + child.height + ", " + admin.recordset[0].idCenter + ", " + anamnesisId + ", " + parentId +
                    ", '" + imageName + "');");
        }

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.allUsers = async (id) => {
    try {
        const request = await poolPromise;

        var userData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        if (userData.recordset.length > 0) {
            var users = await request.request()
                .query("SELECT * FROM [User] WHERE idCenter='" + userData.recordset[0].idCenter + "';");
        }

        return ({ status: 'success', users: users.recordset });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.addSchedule = async (id, schedule) => {
    try {
        schedule.map(async (timeTable) => {
            const request = await poolPromise;
            var admin = await request.request()
                .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

            var scheduled = await request.request()
                .query("SELECT * FROM appointment WHERE startDate='" + timeTable.startDate + "' AND idUser="
                    + timeTable.idUser + " AND idChild=" + timeTable.idChild + ";");
            var childFree = await request.request()
                .query("SELECT * FROM appointment WHERE startDate='" + timeTable.startDate +
                    "' AND idChild=" + timeTable.idChild + ";");

            var teacherFree = await request.request()
                .query("SELECT * FROM appointment WHERE startDate='" + timeTable.startDate + "' AND idUser="
                    + timeTable.idUser + ";");

            if (scheduled.recordset.length == 0) {
                if (childFree.recordset.length == 0) {
                    if (teacherFree.recordset.length == 0) {
                        await request.request()
                            .query("INSERT INTO appointment (endDate, startDate, text, description, idCenter, idUser, idChild) VALUES ('" +
                                timeTable.endDate + "', '" + timeTable.startDate + "', '" + timeTable.text + "', '" + timeTable.description +
                                "', " + admin.recordset[0].idCenter + ", " + timeTable.idUser + ", " + timeTable.idChild + ");");
                    }
                }
            }
        });
        return ({ addStatus: 'success' });
    } catch (err) {
        console.log(err);
        return ({ addStatus: 'failed' });
    }
};

Admin.updateSchedule = async (timeTable) => {
    try {
        const request = await poolPromise;
        var appointments = await request.request().query("SELECT * FROM appointment;");
        var scheduleIDs = [];

        timeTable.map(schedule => {
            scheduleIDs.push(schedule.idAppointment);
        });

        for (const appointment of appointments.recordset) {
            const id = scheduleIDs.indexOf(appointment.idAppointment);
            if (id == -1) {
                await request.request()
                    .query("DELETE FROM appointment WHERE idAppointment=" + appointment.idAppointment + ";");
            } else {
                //posto raspored postoji u bazi
                //proveri da li su mu vresnosti izmenjena, ako jesu odradi update
                const schedule = timeTable.find(tt => tt.idAppointment == appointment.idAppointment);
                await request.request().query("UPDATE appointment SET endDate='" + schedule.endDate + "', startDate='" + schedule.startDate +
                    "', text='" + schedule.text + "', description='" + schedule.description + "' WHERE idAppointment = " + schedule.idAppointment + ";");
            }
        }

        return ({ updateStatus: 'success', updateMessage: 'Schedule is updated.' })
    } catch (err) {
        console.log(err);
        return ({ updateStatus: 'failed' })
    }
};

Admin.getTeachersEmails = async (schedule) => {
    try {
        const request = await poolPromise;
        var teacherEmails = [];

        var teachers = await request.request()
            .query("SELECT * FROM [User];");

        schedule.forEach(timeTable => {
            var email = '';

            teachers.recordset.forEach(teacher => {
                if (!teacherEmails.some(email => email.email === teacher.email)) {
                    if (teacher.idUser == timeTable.idUser) {
                        email = teacher.email;
                        teacherEmails.push({ email });
                    }
                }
            });
        });

        return ({ teacherStatus: 'success', teacherEmails: teacherEmails })
    } catch (err) {
        console.log(err);
        return ({ teacherStatus: 'failed' });
    }
};

Admin.getParentEmails = async (timeTable) => {
    try {
        const request = await poolPromise;
        var childrensSchedule = [];
        var childrensSchedule = [];

        var children = await request.request()
            .query("SELECT * FROM child;");
        var parents = await request.request()
            .query("SELECT * FROM parent;");

        timeTable.forEach(schedule => {

            parents.recordset.forEach(parent => {
                var emailInfo = {};
                var childInfo = {};

                emailInfo['parentEmail'] = parent.email;

                children.recordset.forEach(child => {
                    if (child.idChild == schedule.idChild) {
                        if (parent.idParent == child.idParent) {
                            childInfo['childId'] = child.idChild;
                            childInfo['childName'] = child.name + ' ' + child.lastName;
                            emailInfo['childInfo'] = childInfo;

                            childrensSchedule.push(emailInfo);

                        }
                    }
                })
            });
        });

        childrensSchedule.forEach(information => {
            var appointmentInfo = {};
            var appointments = [];

            timeTable.forEach(schedule => {

                if (schedule.idChild == information.childInfo.childId) {
                    var startDate = schedule.startDate.split('T');
                    var startTime = startDate[1].split(':');
                    var endDate = schedule.endDate.split('T');
                    var endTime = endDate[1].split(':');

                    appointmentInfo['description'] = schedule.description;
                    appointmentInfo['text'] = schedule.text;
                    appointmentInfo['startDate'] = startDate[0];
                    appointmentInfo['classDuration'] = startTime[0] + ':' + startTime[1] + '-' + endTime[0] + ':' + endTime[1];
                    appointments.push(appointmentInfo);
                }
                information['appointments'] = appointments;
            })
        })

        const uniquechildrensSchedule = childrensSchedule.filter((email, index) => {
            const _email = JSON.stringify(email);
            return index === childrensSchedule.findIndex(obj => {
                return JSON.stringify(obj) === _email;
            });
        });

        return ({ parentStatus: 'success', childrensSchedule: uniquechildrensSchedule })
    } catch (err) {
        console.log(err);
        return ({ parentStatus: 'failed' });
    }
};

Admin.schedule = async (id) => {
    try {
        const request = await poolPromise;

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + id + ";");

        var appointments = await request.request()
            .query("SELECT * FROM appointment WHERE idCenter=" + admin.recordset[0].idCenter + ";");

        return ({ appointments: appointments.recordset })
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.searchTeacher = async (adminId, fullName) => {
    try {
        const request = await poolPromise;
        var teacherName = [];

        var admin = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + adminId + ";");
        var teachers = await request.request()
            .query("SELECT * FROM [User] WHERE idCenter=" + admin.recordset[0].idCenter + ";");

        if (teachers.recordset.length > 0) {
            if (fullName === '') {
                return ({ status: 'success', teacher: teachers.recordset })
            } else if (fullName.indexOf(' ') >= 0) {
                teacherName = fullName.split(' ');

                var firstSearchCombination = await request.request()
                    .query("SELECT * FROM [User] WHERE name='" + teacherName[0] + "' AND lastName='" + teacherName[1] + "';");

                if (firstSearchCombination.recordset.length == 0) {
                    var secondSearchCombination = await request.request()
                        .query("SELECT * FROM [User] WHERE name='" + teacherName[1] + "' AND lastName='" + teacherName[0] + "';");

                    return ({ status: 'success', teacher: secondSearchCombination.recordset });
                } else {
                    return ({ status: 'success', teacher: firstSearchCombination.recordset })
                }
            } else {
                var firstSearchCombination = await request.request()
                    .query("SELECT * FROM [User] WHERE name='" + fullName + "';");

                if (firstSearchCombination.recordset.length == 0) {
                    var secondSearchCombination = await request.request()
                        .query("SELECT * FROM [User] WHERE lastName='" + fullName + "';");

                    return ({ status: 'success', teacher: secondSearchCombination.recordset });
                } else {
                    return ({ status: 'success', teacher: firstSearchCombination.recordset })
                }
            }
        } else {
            return ({ status: 'failed', teacher: teachers.recordset })
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.getTeacherData = async (teacherId) => {
    try {
        const request = await poolPromise;

        var teacherData = await request.request()
            .query("SELECT * FROM [User] WHERE idUser=" + teacherId + ";");
        var appointments = await request.request()
            .query("SELECT * FROM appointment WHERE idUser=" + teacherId + ";");

        return ({ status: 'success', teacher: teacherData.recordset, appointments: appointments.recordset })
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.checkIfEstimateExist = async (childId) => {
    try {
        const request = await poolPromise;
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const nowDate = nowDateAndTime.split(' ');
        const nowMonth = nowDate[0].split('-');
        var exist = false;

        var estimates = await request.request()
            .query("SELECT * FROM estimate WHERE idChild=" + parseInt(childId) + ";");

        if (estimates.recordset.length == 0) {
            exist = false;
        }
        else {
            estimates.recordset.forEach(estimate => {
                const estimateDateAndTime = new Date(estimate.date).toISOString().slice(0, 19).replace('T', ' ');
                const estimateDate = estimateDateAndTime.split(' ');
                const estimateMonth = estimateDate[0].split('-');
                
                if (estimateMonth[1] === nowMonth[1]) {
                    exist = true;
                }
            });
        }

        return exist;
    } catch (err) {
        console.log(err);
        return false;
    }
};

Admin.saveAndSendEstimate = async (adminId, childId, estimate) => {
    try {
        const request = await poolPromise;
        const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const estimateExist = await Admin.checkIfEstimateExist(childId);

        if (estimateExist) {
            return ({ status: 'failed' })
        } else {
            await request.request()
                .query("INSERT INTO estimate (date, grossMotorSkils, fineMotorSkils, perceptualAbilities, speakingSkils, socioEmotionalDevelopment, " +
                    "intellectualAbility, grossMotorSkilsMark, fineMotorSkilsMark, perceptualAbilitiesMark, speakingSkilsMark, " +
                    "socioEmotionalDevelopmentMark, intellectualAbilityMark, idChild, idUser) VALUES ('" + nowDateAndTime + "', '" +
                    estimate.grossMotorSkils + "', '" + estimate.fineMotorSkils + "', '" + estimate.perceptualAbilities + "', '" +
                    estimate.speakingSkils + "', '" + estimate.socioEmotionalDevelopment + "', '" + estimate.intellectualAbility +
                    "', '" + estimate.grossMotorSkilsMark + "', '" + estimate.fineMotorSkilsMark + "', '" + estimate.perceptualAbilitiesMark +
                    "', '" + estimate.speakingSkilsMark + "', '" + estimate.socioEmotionalDevelopmentMark + "', '" + estimate.intellectualAbilityMark
                    + "', " + parseInt(childId) + ", " + adminId + ");");

            var child = await request.request()
                .query("SELECT * FROM child WHERE idChild=" + parseInt(childId) + ";");
            var childName = child.recordset[0].name + ' ' + child.recordset[0].lastName;

            var teacher = await request.request()
                .query("SELECT * FROM [User] WHERE idUser=" + adminId + ";");
            var teacherName = teacher.recordset[0].name + ' ' + teacher.recordset[0].lastName;

            var childParent = await request.request()
                .query("SELECT * FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");

            return ({ status: 'success', parentEmail: childParent.recordset[0].email, childName: childName, teacherName: teacherName });
        }
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.deleteEstimate = async (estimateId) => {
    try {
        const request = await poolPromise;

        await request.request()
            .query("DELETE FROM estimate WHERE idEstimate=" + estimateId + ";");
        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.changeParentData = async (parent) => {
    try {
        var sendEmail = false;
        const request = await poolPromise;

        var parentData = await request.request()
            .query("SELECT * FROM parent WHERE idParent=" + parent.idParent + ";");

        if (parentData.recordset[0].email !== parent.email) {
            sendEmail = true;
        }
        await request.request().query("UPDATE parent SET name='" + parent.name + "', lastname='" + parent.lastname +
            "', email='" + parent.email + "' WHERE idParent = " + parent.idParent + ";");

        const message = "Parent's data are changed successfully."
        return ({ status: 'success', message: message, sendEmail: sendEmail });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.removeChild = async (childId) => {
    try {
        const request = await poolPromise;

        var child = await request.request()
            .query("SELECT * FROM child WHERE idChild=" + childId + ";");

        await request.request()
            .query("DELETE FROM child WHERE idChild=" + childId + ";");
        await request.request()
            .query("DELETE FROM parent WHERE idParent=" + child.recordset[0].idParent + ";");
        await request.request()
            .query("DELETE FROM anamnesis WHERE idAnamnesis=" + child.recordset[0].idAnamnesis + ";");
        await request.request()
            .query("DELETE FROM estimate WHERE idChild=" + childId + ";");
        await request.request()
            .query("DELETE FROM appointment WHERE idChild=" + childId + ";");

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

Admin.removeTeacher = async (teacherId) => {
    try {
        const request = await poolPromise;

        await request.request()
            .query("DELETE FROM [User] WHERE idUser=" + teacherId + ";");

        return ({ status: 'success' });
    } catch (err) {
        console.log(err);
        return ({ status: 'failed' });
    }
};

module.exports = Admin;