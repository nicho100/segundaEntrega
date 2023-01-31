import { json, query } from "express"

const admin= require("firebase-admin")
export class ContenedorFireBase{
    constructor(){ 
       
        this.id= 1
        this.timestamp=new Date().toLocaleString()
       
    }
    save=async(object)=>{
            try{
              let doc= query.doc(`${this.id}${this.timestamp}`)
              await doc.create({object})
              this.id++
              return this.id-1
            }
            catch(err){
                console.log("error de lectura",err)
            }
    }
    getAll=async(collection)=>{
        const db= admin.firestore()
        const query= db.collection(collection)
        const querySnapshot=await query.get()
        if (querySnapshot.empty){
            console.log('coleccion vacia')
        }else{
            querySnapshot.forEach(doc=>{
                console.log(JSON.stringify(doc.data()),null,2)
            })
        }
    }
    delete= async(elementId,collection)=>{
        const db =admin.firestore()
        const query=db.collection(collection)
        await query.doc(elementId).delete()
    }///
    getById=async(elementId)=>{
        const db =admin.firestore()
        const query=db.collection(collection)
        query.doc(elementId)    
    }
    update= async(elementId,key,newValue,collection)=>{
        const db= admin.firestore()
        const query= db.collection(collection)
        query.doc(elementId).update({key:newValue})
    }
}
