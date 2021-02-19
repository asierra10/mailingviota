const mongoose = require('mongoose');

const informedClientSchema = new mongoose.Schema({
    _id:{
        type: String,
    },
    name_client:{
        type: String
    },
    lastname_client:{
        type: String
    },
    address_client:{
        type: String
    },
    telephone_client:{
        type: String
    },
    email_client:{
        type: String
    },
    city_client:{
        type: String
    },
    file_number:{
        type:Number
    },
    date_send:{
        type: Date
    }
},{
    collection:'informed_client'
});

module.exports = mongoose.model('informed_client',informedClientSchema);