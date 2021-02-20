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
    },
    async getAllFiles(req, res){
        try{
            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            const listAllClients = await informedClient.find({});
            const listAllFiles = [];
            listAllClients.forEach(cl => {
                const fl = cl.file_number;
                listAllFiles.push(fl);
            });
            const listFilterFiles = listAllFiles.filter(onlyUnique);
            if(listAllFiles.length == 0){
                res.status(200).json({ "message":"No se han subido archivos." });
            }else{
                res.status(200).json({ 
                    "message": "Todos los archivos subidos:",
                    "data": listFilterFiles
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    },
    async getAllFilesRegistry(req, res){
        const { fileName } = req.params;
        try{
            const listAllClients = await informedClient.find({
                file_number : fileName
            });
            if(listAllClients.length == 0){
                res.status(200).json({ "message":"No existen registros sobre ese archivo." });
            }else{
                res.status(200).json({ 
                    "message": "Todos los registros del archivo "+fileName+": ",
                    "data": listAllClients
                });
            }
        }catch(err){
            res.status(400).json({message:"Algo ha fallado: "+err.message});
        }
    }
}