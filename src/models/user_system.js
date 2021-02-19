const mongoose = require('mongoose');

const userSystemSchema = new mongoose.Schema({
    _id:{
        type: String,
    },
    name_userSystem:{
        type: String,
        required: true
    },
    user_userSystem:{
        type: String,
        required: true
    },
    pass_userSystem:{
        type: String,
        required: true
    },
    token_userSystem:{
        type: String,
    },
    firtsTimeLogin:{
        type: Boolean,
    },
    updatedPassword:{
        type: Boolean,
    },
    userCreatedAt:{ 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    type_userSystem:{
        type: String,
        required: true
    }
},{
    collection:'user_system'
});

module.exports = mongoose.model('user_system',userSystemSchema);