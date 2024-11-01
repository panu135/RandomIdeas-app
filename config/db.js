
const mongoose=require('mongoose');

const connectDB= async()=>{
    const connect=await mongoose.connect(process.env.MONGO_URI); //its is promise so used async await
    console.log(`Mongo db connected: ${connect.connection.host}`);
}


module.exports=connectDB;