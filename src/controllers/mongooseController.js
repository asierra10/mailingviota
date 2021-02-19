const mongoose = require('mongoose');
const informedClient = require('../models/informed_client');

module.exports = { 
    async getAllInformedEmails(req, res){
        try{
            const listAllClients = await informedClient.find({});
            const listAllEmails = [];
            listAllClients.forEach(cl => {
                    const em = cl.email_client;
                    listAllEmails.push(em);
                }
            );
            if(listAllEmails.length == 0){
                res.status(200).json({ "message":"No existen correos de clientes informados." });
            }else{
                res.status(200).json({ 
                    "message": "Todos los clientes informados:",
                    "data": listAllEmails
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    }
}