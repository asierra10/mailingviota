const app = require('express')();
const mailer = require('express-mailer');
const { EMAIL_SERVER, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, EMAIL_NAME } = require('../path');

module.exports = {
    sendEmail(dest_email, subject_email, message_email){
        mailer.extend(app,{
            from: EMAIL_NAME+' <'+EMAIL_USER+'>',
            host: EMAIL_SERVER, 
            secureConnection: true, 
            port: 465, 
            transportMethod: 'SMTP', 
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });
        return new Promise((resolve, reject) => {
            app.mailer.send('email',{
                to: dest_email,
                subject_email: subject_email,
                text: message_email, 
                html: '<div style="background:black;color:white;text-align:center;"><h1>'+message_email+"</h1></div>"
            }, (error, info) => {
                if(error){
                    return reject(error);
                }
                return resolve(info);
            });
        });
    }
}