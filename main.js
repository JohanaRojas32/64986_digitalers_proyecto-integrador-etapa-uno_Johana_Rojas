import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './css/style.css'
import { comprarProducto, leerLocalStorage } from './src/carrito'



const productosTodos = document.getElementById('card-productos')
//console.log(productosTodos)

const carritoGeneral = document.getElementById('carrito-ul')
//console.log(carritoUl)


cargarEventos()


function cargarEventos() { 

    productosTodos.addEventListener('click', (e) => comprarProducto(e)) 

    document.addEventListener('DOMContentLoaded', leerLocalStorage())
}




