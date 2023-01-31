import mongoose from "mongoose";
const admin= require("firebase-admin")
const serviceAcaunt=require('../proyecto-coderhouse-1863d-firebase-adminsdk-mg6ix-767fb12fc1.json')
let isConnected;
const connectToDb=async()=>{
    if(!isConnected){
        console.log("se conecto")
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        isConnected=true
        return
    }
    console.log("esta conectado")
    return
}
const connectToFireBase=()=>{

admin.initializeApp({
    credential: admin.credential.cert(serviceAcaunt),
    databaseURL:'http://proyecto-coderhouse-1863d.firebaseio.com',
})
}
export {connectToDb,connectToFireBase}