import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './css/style.css'
import { 
    calcularTotal,
    cambioDeCantidad,
    comprarProducto, 
    eliminarProducto, 
    eliminarProductoTachito, 
    leerLocalSToragePedido, 
    leerLocalStorage, 
    procesarPedido, 
    procesarPedido2, 
    vaciarCarrito
} from './src/carrito'




const productosTodos = document.getElementById('card-productos')
//console.log(productosTodos)

const carritoGeneral = document.getElementById('carrito-ul')
//console.log(carritoUl)

const pagesCarritoCompra = document.getElementById('lista-compra')


cargarEventos()



function cargarEventos() { 

    const ruta = String(location.href)
    if(ruta.includes('index.html')) {

        esIndex()
    } else if(ruta.includes('carrito.html')) {
        esCarrito()
    }

    if(ruta.includes('nosotros.html')) {
        esElResto()
    }

    if(ruta.includes('contacto.html')) {
        esElResto()
    }
}



    function esIndex() {
    console.log('no estoy en carrito')

        const vaciarCarritoBtn = carritoGeneral.querySelector('#vaciar-carrito')
        const procesarPedidoBtn = carritoGeneral.querySelector('#procesar-pedido')
    
        productosTodos.addEventListener('click', e => comprarProducto(e)) 
    
        document.addEventListener('DOMContentLoaded', leerLocalStorage())
    
        carritoGeneral.addEventListener('click', e => eliminarProducto(e))
    
        vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    
        procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
    

    }


    function esCarrito() {
        console.log('estoy en carrito')
        document.addEventListener('DOMContentLoaded', leerLocalSToragePedido())

        pagesCarritoCompra.addEventListener('click', e => eliminarProductoTachito(e))
        
        calcularTotal()
        
        pagesCarritoCompra.addEventListener('change', e => cambioDeCantidad(e))
        pagesCarritoCompra.addEventListener('keyup', e => cambioDeCantidad(e))
    }


function esElResto() {
    console.log('no estoy en carrito')

    const vaciarCarritoBtn = carritoGeneral.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carritoGeneral.querySelector('#procesar-pedido')


    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    carritoGeneral.addEventListener('click', e => eliminarProducto(e))

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

    procesarPedidoBtn.addEventListener('click', e => procesarPedido2(e))
}

