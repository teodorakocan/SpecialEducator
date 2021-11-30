var mailConfig = require('../configurations/mailConfig');

const MailDelivery = function (to) {
    this.to = admin.to;
    this.message = admin.message;
};

MailDelivery.sendScheduleToTeachers = (teachersEmails) => {
    const contentEmail = '<h1>Your schedule is updated</h1><div><Link to="http://localhost:3000" /></div>';
    teachersEmails.map(email => {
        var mailOptionsCenter = {
            from: 'specialeducator2021@gmail.com',
            to: email.email,
            subject: 'Special Educator - Schedule',
            html: contentEmail
        };

        mailConfig.sendMail(mailOptionsCenter);

    });
};

MailDelivery.sendScheduleToParent = (parentsEmails) => {

    for (const parentEmail of parentsEmails) {
        var emailMessage = '';
        const emailHead = '<h1> Schedule for ' + parentEmail.childInfo.childName + '</h1>'
        parentEmail.appointments.forEach(appointment => {
            emailMessage += '<div><p>Date:' + appointment.startDate + '</p><p>Class start at:' + appointment.classDuration +
                '</p><p>Description:' + appointment.description + '</p><p>Text:' + appointment.text + '</p></div>';
        });

        var mailOptionsCenter = {
            from: 'specialeducator2021@gmail.com',
            to: parentEmail.parentEmail,
            subject: 'Special Educator',
            html: emailHead + emailMessage
        };
        mailConfig.sendMail(mailOptionsCenter);
    }
};

MailDelivery.sendNewUserEmail = (user) => {
    const contentEmail = '<h1>Registration</h1><div><p>Welcome. You are now signed up on aplication Special Educator with email/username: ' +
        user.email + ' and password: ' + user.password + '.</p></div>';
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator',
        html: contentEmail
    };

    mailConfig.sendMail(mailOptionsCenter, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendParentEmail = (child, parent) => {
    const contentEmail = '<h1>Registration</h1><div><p>Welcome. Your child ' + child.name + ' ' + child.lastName + ' is sign up on application Special Educator.' +
        'All information about your child will be sent to this email address.</p></div>';
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: parent.email,
        subject: 'Special Educator',
        html: contentEmail
    };

    mailConfig.sendMail(mailOptionsCenter, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendRegistrationToUser = (user, name) => {
    const contentEmail = '<h1>Registration</h1><div><p>Welcome. You have successfully registered your special education center, ' + name +
        ', on the Special Educator application. Enjoy using it.</p></div>';
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator',
        html: contentEmail
    };

    mailConfig.sendMail(mailOptionsCenter, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendResetPasswordLink = (resetCode, email) => {
    const emailMessage = '<Link to="http://localhost:3000/resetPassword?resetCode=' + resetCode + '"/>' +
        'Code will expire in one hour.';
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: email,
        subject: 'Special Educator - Reset code',
        text: emailMessage
    };

    mailConfig.sendMail(mailOptionsCenter, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendUserDataUpdates = (user) => {
    const contentEmail = '<h1>Data updated</h1><div><p>You have successfully changed email address on Special Educator app from ' + userData.recordset[0].email + ' to ' + user.email + '. ' +
        'From now on all other information will be sent on ' + user.email + ', and you will be logged in with this new email address as your username.</p></div>';
    var mailOptions = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator - Update',
        html: contentEmail
    };
    mailConfig.sendMail(mailOptions, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendToParentDailyReport = (parentEmail, report, childName, teacherName) => {
    const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const nowDate = nowDateAndTime.split(' ');

    var subject = 'Special Educator - Daily report'
    var emailContent = '<h1><span style="text-decoration: underline;">' + childName + ' - ' + nowDate[0] + '</span></h1>' +
        '<div><p><strong>Progress: </strong>' + report.progress + '</p><p><strong>Problems: </strong>' + report.problems +
        '</p><p><strong>Recommendation for parent: </strong>' + report.recommendationForParent + '</p><p><strong>Mark: </strong>' +
        report.mark + '</p><p><strong>Teacher who wrote report: </strong>' + teacherName + '</p></div>'
    var mailOptions = {
        from: 'specialeducator2021@gmail.com',
        to: parentEmail,
        subject: subject,
        html: emailContent
    };

    mailConfig.sendMail(mailOptions, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

MailDelivery.sendToParentEstimate = (parentEmail, estimate, childName, teacherName, childId) => {
    const nowDateAndTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const nowDate = nowDateAndTime.split(' ');

    var subject = 'Special Educator - Estimate'
    var emailContent = '<h1><span style="text-decoration: underline;">' + childName + ' - ' + nowDate[0] + '</span></h1>' +
        '<div><p><strong>Gross motor skils: </strong>' + estimate.grossMotorSkils + '</p><p><strong>Fine motor skils: </strong>' + estimate.fineMotorSkils +
        '</p><p><strong>Perceptual abilities: </strong>' + estimate.perceptualAbilities + '</p><p><strong>Speaking skils: </strong>' + estimate.speakingSkils +
        '</p><p><strong>Socio emotional development: </strong>' + estimate.socioEmotionalDevelopment + '</p><p><strong>Intellectual ability: </strong>' +
        estimate.intellectualAbility + '</p><p><strong>Teacher who wrote estimate: </strong>' + teacherName + '</p></div>';
    var dailyReportDiagramLink = '<div><Link to="http://localhost:3000/monthlyDailyReportDiagram?childId=' + childId + '"/></div>';
    var annualEstimateDiagramLink = '<div><Link to="http://localhost:3000/annualEstimateDiagram?childId=' + childId + '"/></div>';
    
    var mailOptions = {
        from: 'specialeducator2021@gmail.com',
        to: parentEmail,
        subject: subject,
        html: emailContent + dailyReportDiagramLink + annualEstimateDiagramLink
    };

    mailConfig.sendMail(mailOptions, function (error, info) {
        if (error) {
            return true;
        } else {
            return false;
        }
    });
};

module.exports = MailDelivery;