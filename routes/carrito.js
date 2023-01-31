import { Router } from "express"
import { carrito,apiClass } from "../config/initialize.js"
import { carritoDao } from "../daoss/index.js"

const routerCarrito= Router()
//creamos las rutas para el carrito
routerCarrito.post('/',async(req,res)=>{
    //se crea el carro apartir de lo que este en el body de postman
    await connectToDb()
    const carritoAgregar=req.body
    let cart=carrito.save(carritoAgregar)
    res.status(200).json(cart)
})
routerCarrito.delete('/:id',async(req,res)=>{
    await connectToDb() 
    const id=req.params.id
    let cart=carrito.getAll()
    let cartFind = cart.find(item => item.id == id) 
            if(cartFind){
               let indice=cart.indexOf(cartFind)
               //borrar el carro pedido
               cart.splice(indice,1)
                res.status(200).json(cart)
                return         
        }else res.status(403).json({error:-2,descripcion:`ruta:/api/carrito/${id} metodo delete no implementada`}) 
})
routerCarrito.get('/:id/productos',async(req,res)=>{
    //se muesrtan los id de los productos dentro del carro
    await connectToDb()
    const id=req.params.id
    const cart=carrito.getAll()
    let productosCarrito = cart.find(item => item.id == id)
    res.status(200).json(productosCarrito.productos)   
})
routerCarrito.post('/:id/productos/:id_prod',async(req,res)=>{
    await connectToDb()
    const idCarrito=req.params.id
    const idProducto=req.params.id_prod
    const cart=carrito.getAll()
    let productos=apiClass.getAll()
    let prodFind = productos.find(item => item.id == idProducto)//se busca si el producto existe
    let carro = cart.find(item => item.id == idCarrito)//se verifica si el carro existe
    if(prodFind && carro){//si existen los 2 se ingresa el id del producto dentro del carro
    carro.productos.push(prodFind.id)
    res.status(200).json(carro)
    }else res.status(404).json({error:-2,descripcion:`ruta/${idCarrito}/productos/${idProducto} metodo post no implementada`})
})
routerCarrito.delete('/:id/productos/:id_prod',async(req,res)=>{
    await connectToDb()
    const idCarrito=req.params.id
    const idProducto=req.params.id_prod
    const cart=carrito.getAll()
    let carro = cart.find(item => item.id == idCarrito)//se busca si el carro existe
    let productos=carro.productos//se guardan todos los productos que tenga el carro en una variable
    
    let prodFind = productos.find(item => item == idProducto)//se verifica que el carro tenga el producto
    
    if(prodFind && carro){//si existe el carro y el producto esta dentro del carro,se borra el producto pedido
        let indice=productos.indexOf(prodFind)
        carro.productos.splice(indice,1)
        res.status(200).json(carro)
    }else res.status(404).json({error:-2,descripcion:`ruta/${idCarrito}/productos/${idProducto} metodo delete no implementada`})
})
export{routerCarrito}