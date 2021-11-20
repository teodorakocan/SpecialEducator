const mailConfig = require('../configurations/mailConfig');

exports.mailDelivery = async function(mail, emailMessage){
    var mailOptionsCenter = {
        from: 'specialeducator2021@gmail.com',
        to: mail,
        subject: 'Special Educator',
        text: emailMessage
    };

    mailConfig.sendMail(mailOptionsCenter, function (error, info) {
        if (error) {
            return({ status: 'failed' });
        } else {
            return({ status: 'success' });
        }
    });
}