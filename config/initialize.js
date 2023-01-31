
import { ContenedorMemoria } from "../daoss/contenedorMemoria.js"
import { productosDao } from "../daoss/index.js"
export const apiClass= new ContenedorMemoria
export const carrito= new ContenedorMemoria

export const initialize = () => {
    productosDao.save({
        title: "Xbox Series x",
        price: 500,
        link: "url1",
        stock:10  
    })
    productosDao.save({
        title: "Playstation 5",
        price: 550,
        link: "url2",
        stock:5
    })
  }
 
