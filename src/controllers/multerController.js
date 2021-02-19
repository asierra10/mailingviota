const multer = require('multer');
const { FILES_DIR } = require('../path');
console.log(FILES_DIR);
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,FILES_DIR)
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
});

module.exports = multer({ 
        storage:storage,
        fileFilter:function(req, file, cb){
            if(file.mimetype === 'text/csv'){
                cb(null,true);
            }else{
                cb(null, false);
                return cb(new Error('Solo se permiten archivos .CSV'));
            }
        }
    }).single('file');   
