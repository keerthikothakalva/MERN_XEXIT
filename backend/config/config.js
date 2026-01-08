const mongoose = require('mongoose');

const connectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected')
    }
    catch(error){
        console.log("Error in connecting DB", error)
    }
}

module.exports = connectMongoDB