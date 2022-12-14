const { Router } = require('express');
const upload  = require('../controllers/multerController');
const auth = require('../controllers/authController');
const send = require('../controllers/nodemailerController');
const fs = require('../controllers/fileSystemController');
const { MULTIPLE_EMAIL_SENDER, SIMPLE_EMAIL_SENDER, GET_ALL_INFORMED_EMAILS,
        GET_ALL_FILENAMES, GET_ALL_INFORMEDCLIENTS_BY_FILENAME } = require('../path');
const bdTask = require('../controllers/mongooseController');
const r = Router();
const snEm = require('../controllers/sendGridController');
const expMa = require('../controllers/expressMailerController');

//Send multiple e-mails
r.post(MULTIPLE_EMAIL_SENDER, auth.validateToken, upload, async (req, res) => {
    const { subject_email } = req.body;
    const { message_email } = req.body;
    console.log(subject_email+" "+message_email);
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
            console.log("Send complete! "+ response);   
        })
        .catch(error => res.status(500).json({ message: error }));
        //fs.deleteFile(filePath);
    }catch(err){
        res.status(400).json({
            "message":"Los correos no pueden ser enviados por: "+err 
        });
    }
});

//Send a simple e-mail
r.post(SIMPLE_EMAIL_SENDER, auth.validateToken, (req, res) => {
    const { dest_email, subject_email, message_email } = req.body;
    try{
        send.sendEmail(dest_email, subject_email, message_email)
        .then(response => {
            res.status(200).json({
                "message":"Correo electronico enviado correctamente",
                "data":response
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ "message": "El correo no ha podido ser enviado por: "+error });
        });
    }catch(err){
        res.status(400).json({ "message": "Algo ha fallado: "+err });
    }
    
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

//Get all emails 'bout informed clients
r.get(GET_ALL_INFORMED_EMAILS, auth.validateToken, bdTask.getAllInformedEmails);

//Get all filenames
r.get(GET_ALL_FILENAMES, auth.validateToken, bdTask.getAllFiles);

//Get all registres 'bout a filename
r.get(GET_ALL_INFORMEDCLIENTS_BY_FILENAME, auth.validateToken, bdTask.getAllFilesRegistry);

module.exports = r; 