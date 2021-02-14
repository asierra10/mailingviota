const { API_KEY_SENDGRID, EMAIL_USER } = require('../path');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(API_KEY_SENDGRID);

module.exports = {
    sendEmail(dest_email, subject_email, message_email){
        const msg = {
            to: dest_email,
            from: EMAIL_USER, 
            subject: subject_email,
            text: message_email,
            html: '<div style="background:black;color:white;text-align:center;"><h1>'+message_email+"</h1></div>",
        };
        return new Promise((resolve, reject) => {
            sgMail.send(msg)
                    .then((info) => {
                        return resolve(info);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
        });
    }
}