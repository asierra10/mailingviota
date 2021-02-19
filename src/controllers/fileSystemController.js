const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');

const informedClient = require('../models/informed_client');

module.exports = {
    readFile(filePath){
        const path = filePath;
        const emails = [];
        return new Promise((resolve, reject) => {
            console.log(path);
            fs.createReadStream(path)
                .pipe(csv({}))
                .on('data',(row) => {
                    const em = row["email"];
                    emails.push(em);
                    try{
                        const currentInformedClient = new informedClient({
                            _id:mongoose.Types.ObjectId(),
                            name_client: row["nombre"],
                            lastname_client: row["apellido"],
                            address_client: row["direccion"],
                            telephone_client: row["telefono"],
                            email_client: row["email"],
                            city_client: row["ciudad"],
                            file_number: 1,
                            date_send: new Date().toUTCString()
                        });
                        const clientSaved = currentInformedClient.save(); 
                    }catch(err){
                        return reject(err);
                    }
                    
                })
                .on('end', () => {
                    if(emails.length != 0){
                        return resolve(emails);
                    }else{
                        return reject("¡No hay correos electrónicos en el archivo!");
                    }
                });
        });          
    },
    deleteFile(filePath){
        const path = filePath;
        try{
            fs.unlink(path, (err) => {
                if(err){
                    res.status(400).json({
                        message:"El archivo no se puede eliminar "+err
                    });
                }else{
                    console.log("Archivo eliminado correctamente");
                }
            });
        }catch(err){
            res.status(400).json({
                message:"Algo sucede con el archivo "+err
            });
        }   
    },
    rf(a, next){
        console.log(a);
    }
}