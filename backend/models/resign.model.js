const mongoose = require('mongoose')

const resignSchema = new mongoose.Schema({
    empId:{
        type:String,
        required:true
    },
    lwd:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})

const ResignInfo = mongoose.model('ResignInfo',resignSchema);
module.exports = ResignInfo;