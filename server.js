import express from "express";
//const express=require('express')
import { initialize } from "./config/initialize.js";
import { routerCarrito } from "./routes/carrito.js";
import { routerProductos } from "./routes/products.js";
const app= express()
//creo los routers de productos y carrito

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

initialize()

app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)
app.listen(8080)