const fs = require('fs');
const csv = require('csv-parser');
const { rejects } = require('assert');

module.exports = {
    readFile(filePath){
        const path = filePath;
        const emails = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv({}))
                .on('data',(row) => {
                    const em = row["email"];
                    emails.push(em);
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