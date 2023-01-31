import { Router } from "express"
import { connectToDb } from "../config/connectToDb.js"
import { apiClass } from "../config/initialize.js"
import { productosDao } from "../daoss/index.js"

const routerProductos= Router()
let administrador= true
routerProductos.get('/',async(req,res)=>{
    await connectToDb()
    const produc=apiClass.getAll()
    res.status(200).json(produc)   
})
routerProductos.get('/:id?',async(req,res)=>{
    await connectToDb()
    const id= req.params.id
    let productos=apiClass.getAll()
    let prodFind = productos.find(item => item.id == id) 
            if(prodFind){
               res.status(200).json(prodFind)
                return 
            }else res.status(404).json({error:-2,descripcion:`ruta/${id} metodo get no implementada`})
       
})
routerProductos.post('/',async(req,res)=>{
    await connectToDb()
    if (administrador){
    const productoAgregar=req.body
    let productos=apiClass.getAll()
    let indice=productos.length-1//se busca la longitud del array de productos
    let ids=productos[indice].id//se busca el id del ultimo producto en el array
    productoAgregar["id"]=ids+1 //se inserta el id correspondiente al poructo a agregar
    apiClass.save(productoAgregar)
    res.status(200).json(productoAgregar)
    }else res.status(403).json({error:-1,descripcion:"ruta:/api/pruductos metodo post no autorizada"})
})
routerProductos.put('/:id',async(req,res)=>{
    await connectToDb()
    if(administrador){
    const id= req.params.id
    const productoModificar=req.body
    let productos=apiClass.getAll()
    let prodFind = productos.find(item => item.id == id) //se busca si el producto existe
            if(prodFind){
                productoModificar["id"]=prodFind.id//se le inserta el id del producto a la producto que esta en el body
                indice=productos.indexOf(prodFind)//busca el indice del producto a modificar
                productos[indice]=productoModificar//se inserta el producto del body en la base de datos
                res.status(200).json(productos)
                return 
            }else res.status(404).json({error:-2,descripcion:`ruta/${id} metodo put no implementada`})
    }else res.status(403).json({error:-1,descripcion:`ruta:/api/pruductos/${id} metodo put no autorizada`})  
})
routerProductos.delete('/:id',async(req,res)=>{
    await connectToDb()
    if(administrador){
    const id=req.params.id
    let productos=apiClass.getAll()
    let prodFind = productos.find(item => item.id == id) 
            if(prodFind){
                indice=productos.indexOf(prodFind)
               //borrar el producto
               productos.splice(indice,1)
                res.status(200).json(productos)
                return 
            }else res.status(404).json({error:-2,descripcion:`ruta/${id} metodo delete no implementada`})
    }else res.status(403).json({error:-1,descripcion:`ruta:/api/pruductos/${id} metodo delete no autorizada"`}) 
})

export{routerProductos}