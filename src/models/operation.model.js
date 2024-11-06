const mongoose = require('mongoose');
const operationModel = new mongoose.Schema({
    operand1:{
        type: Number,
        required: true
    },
    operand2:{
        type:Number,
        required:true
    },
    operator:{
        type:String,
        required:true
    },
    result:{
        type:Number,
    },
    email:{
        type:String,
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Operation',operationModel)