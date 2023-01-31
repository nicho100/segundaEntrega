import Carrito from "../models/mongoCarrito";
import Producto from "../models/mongoProducto";
import { ContenedorMongo } from "./contenedorMongodb";
export const carritoDao = new ContenedorMongo (Carrito)
export const productosDao= new ContenedorMongo(Producto)
