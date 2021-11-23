var mailConfig = require('../configurations/mailConfig');

const MailDelivery = function (to) {
    this.to = admin.to;
    this.message = admin.message;
};

MailDelivery.sendScheduleToTeachers = (teachersEmails) => {
    teachersEmails.map(email => {
        var mailOptionsCenter = {
            from: 'specialeducator2021@gmail.com',
            to: email.email,
            subject: 'Special Educator',
            text: 'Your schedule is updated.'
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
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator',
        text: 'Welcome. You are now signed up on aplication Special Educator with email/username: ' +
            user.email + ' and password: ' + user.password + '.'
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
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: parent.email,
        subject: 'Special Educator',
        text: 'Welcome. Your child ' + child.name + ' ' + child.lastName + ' is sign up on application Special Educator.' +
            'All information about your child will be sent to this email address.'
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
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator',
        text: 'Welcome. You have successfully registered your special education center, ' + name + ', on the Special Educator application. Enjoy using it.'
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
        subject: 'Special Educator',
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
    var mailOptions = {
        from: 'specialeducator2021@gmail.com',
        to: user.email,
        subject: 'Special Educator',
        text: 'You have successfully changed email address on Special Educator app from ' + userData.recordset[0].email + ' to ' + user.email + '. ' +
            'From now on all other information will be sent on ' + user.email + ', and you will be logged in with this new email address as your username.'
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