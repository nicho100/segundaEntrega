import mongoose from "mongoose";
const {Schema,model}= mongoose

const carritoSchema=new Schema({
    timeStamp:{type:String, required: true},
    producto:{type:Number,required:true},
})

const Carrito = model("carrito",carritoSchema);
export default Carrito