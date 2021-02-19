const { Router } = require('express');
const upload  = require('../controllers/multerController');
const auth = require('../controllers/authController');
const send = require('../controllers/nodemailerController');
const fs = require('../controllers/fileSystemController');
const { MULTIPLE_EMAIL_SENDER, SIMPLE_EMAIL_SENDER } = require('../path');
const r = Router();
const snEm = require('../controllers/sendGridController');
const expMa = require('../controllers/expressMailerController');


r.post(MULTIPLE_EMAIL_SENDER, upload, async (req, res) => {
    const subject_email =  "Correo de prueba de API Masiva";
    const message_email = "Correo de prueba de API Nodemailer Masivo por NodeJs, express, MongoDb, JWT, Csv-parser, multer.";
    const filePath = req.file.path;
    try{
        fs.readFile(filePath)
        .then((response) => {
            response.forEach(em => {
                console.log("enviando a",em);
                return send.sendEmail(em, subject_email, message_email);
            });
            res.status(200).json({
                "message":"¡Correos enviados correctamente!",
                "destination": response
            });
        })
        .then((response) => {
            console.log("Complete!");
            console.table(response);
        })
        .catch(error => res.status(500).json({ message: error }));
        //fs.deleteFile(filePath);
    }catch(err){
        res.status(400).json({
            "message":"Los correos no pueden ser enviados por: "+err 
        });
    }
    
});

r.post(SIMPLE_EMAIL_SENDER, (req, res) => {
    const { dest_email, subject_email, message_email } = req.body;
    send.sendEmail(dest_email, subject_email, message_email)
        .then(response => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        })
});

r.post('/sendgrid', (req, res) => {
    const { dest_email, subject_email, message_email } = req.body;
    snEm.sendEmail(dest_email, subject_email, message_email)
        .then(response => {
            console.log(response);
            res.status(200).json({ message:"El mensaje ha sido enviado correctamente.", data:response });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message:"Un error ha ocurrido.", data:error });
        })
});

r.post('/express-mailer',(req, res) => {
    const { dest_email, subject_email, message_email } = req.body;
    expMa.sendEmail(dest_email, subject_email, message_email)
        .then(response => {
            console.log(response);
            res.status(200).json({ message:"El mensaje ha sido enviado correctamente.", data:response });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message:"Un error ha ocurrido.", data:error });
        })
});

module.exports = r; 