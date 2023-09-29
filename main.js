import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './css/style.css'
import { 
    comprarProducto, 
    eliminarProducto, 
    leerLocalStorage, 
    vaciarCarrito
} from './src/carrito'



const productosTodos = document.getElementById('card-productos')
//console.log(productosTodos)

const carritoGeneral = document.getElementById('carrito-ul')
//console.log(carritoUl)


cargarEventos()


function cargarEventos() { 

    const vaciarCarritoBtn = carritoGeneral.querySelector('vaciar-carrito')


    productosTodos.addEventListener('click', (e) => comprarProducto(e)) 

    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    carritoGeneral.addEventListener('click', e => eliminarProducto(e))

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
}




