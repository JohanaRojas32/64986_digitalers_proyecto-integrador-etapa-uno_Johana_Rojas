const listaDeProductos = document.querySelector('#lista-carrito tbody')
//console.log(listaDeProductos)
const listaCompra = document.querySelector('#lista-compra')

export function comprarProducto(e) {
    e.preventDefault()

    //condicion para que solo se sume al clickear en "comprar"
    if (e.target.classList.contains('agregar-carrito')) {
        const unProducto = e.target.parentElement.parentElement

    //console.log(unProducto)    // para asegurarme que aparece el prod seleccionado.
    aparecerDatosProducto(unProducto)
    }
}


function aparecerDatosProducto(unProducto) {
    const infoProducto = {
        imagen: unProducto.querySelector('img').src,
        titulo: unProducto.querySelector('h5').textContent,
        precio: unProducto.querySelector('.precio').textContent,
        tipo: unProducto.querySelector('.tipo').textContent,
        calidad: unProducto.querySelector('.calidad').textContent,
        id: unProducto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    console.log(infoProducto)      //comprobe que esta bien.


    //! Ahora quiero guardar la info del carrito en el LS

    let productosLS
    productosLS = queHayEnLS()


    //aca voy a tener cada uno de los productos:
    productosLS.forEach(function(unProductoLS) {
        if (unProductoLS.id === infoProducto.id)
        productosLS = unProductoLS.id;
    })

    //si el producto que estoy comparando no esta repetido(no esta dentro del ls):
    if ( productosLS === infoProducto.id) {
        console.warn('El producto ya esta en el LS (en el carrito)')
    } else {
        insertarAlCarrito(infoProducto)
    }
}



function queHayEnLS() {
    let productosLS
    
//comprobar si hay productos:
if ( localStorage.getItem('productosTodos') === null ) {
    productosLS = []
    } else {
    productosLS = JSON.parse(localStorage.getItem('productosTodos'))
    }
    return productosLS

}


// "insertarAlCarrito" (muestra producto seleccionado en el carrito):

function insertarAlCarrito(unProducto) {
    const fila = document.createElement('tr')

    fila.innerHTML = `
    <td>
        <img src="${unProducto.imagen}" alt="${unProducto.titulo}" width="100">
    </td>
    <td>${unProducto.titulo}</td>
    <td>${unProducto.precio}</td>
    <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${unProducto.id}"></a>
    </td>
    `

    //agrego el elemento al carrito:
    listaDeProductos.appendChild(fila)
    
    guardarProductosEnLS(unProducto)     // hago la funcion abajo
}


function guardarProductosEnLS(unProducto) {
    let productosTodos

    // toma el valor de cualquier arreglo con datos del LS:
    productosTodos = queHayEnLS()

    // producto -> al carrito
    productosTodos.push(unProducto)
    //ahora al LS
    localStorage.setItem('productosTodos', JSON.stringify(productosTodos))

}


// Hacer que el carrito lea el LS (porque al refrescar se borran los prod del carrito):
// con un evento (en el main.js)

export function leerLocalStorage() {
    let productosLS
    productosLS = queHayEnLS()
    productosLS.forEach(function(unProducto) {
        const fila = document.createElement('tr')
        fila.innerHTML = 
        `
        <td>
        <img src="${unProducto.imagen}" alt="${unProducto.titulo}" width="100">
    </td>
    <td>${unProducto.titulo}</td>
    <td>${unProducto.precio}</td>
    <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${unProducto.id}"></a>
    </td>
        `
        listaDeProductos.appendChild(fila)
    })
}


// Al apretar la "x" del carrito que se elimine del carrito y del LS:
export function eliminarProducto(e) {
    e.preventDefault()
    let unProducto, unProductoID
    if (e.target.classList.contains('borrar-producto')) {     // clase que le puse al icono "x"

    unProducto = e.target.parentElement.parentElement   // producto entero
    unProductoID = unProducto.querySelector('a').getAttribute('data-id')
    unProducto.remove()

    eliminarProductoDelLS(unProductoID)

    }
}

// eliminar prod por ID del LS:

function eliminarProductoDelLS(unProductoID) {
    let productosLS
    productosLS = queHayEnLS()
    //comparamos ID del producto a eliminar y el que esta en el LS:
    productosLS.forEach(function(unProductoLS, index){
        if(unProductoLS.id === unProductoID)  // prod del LS / prod que me llega al apretar "x"
        productosLS.splice(index, 1)
    })
    localStorage.setItem('productosTodos', JSON.stringify(productosLS))
}




// BOTON VACIAR CARRITO:
export function vaciarCarrito(e) {
    e.preventDefault()
    while(listaDeProductos.firstChild) {  // while -> mientras
        listaDeProductos.removeChild(listaDeProductos.firstChild)
    }
    vaciarLocalStorageTambien()
} 

function vaciarLocalStorageTambien() {
    window.localStorage.clear()
}


// BOTON PROCESAR PEDIDO:
export function procesarPedido(e) {
    //e.preventDefault    - se podria poner pero no hace falta porque no es a ni form

    //verifico si tengo productos:
    if (queHayEnLS().length === 0 ) {
        console.warn('el carrito esta vacio')
        //! ALERTA SWEETALERT:
        Swal.fire({
            title: 'Upsss!',
            text: '¡El carrito está vacio!',
            icon: 'error',
            background: '#F8F0E5',
            confirmButtonText: 'DE ACUERDO'
          })
    } else {
        location.href = 'pages/carrito.html'  
    }
}

export function procesarPedido2(e) {
    //e.preventDefault    - se podria poner pero no hace falta porque no es a ni form

    //verifico si tengo productos:
    if (queHayEnLS().length === 0 ) {
        console.warn('el carrito esta vacio')
        //! ALERTA SWEETALERT:
        Swal.fire({
            title: 'Upsss!',
            text: '¡El carrito está vacio!',
            icon: 'error',
            background: '#F8F0E5',
            confirmButtonText: 'DE ACUERDO'
          })
    } else {
        location.href = 'carrito.html'  
    }
}


/* --------------------- */
/* pages/carrito.html : */
/* ------------------- */

// para que  pages/carrito.html lea el carrito del index.html (uso el LS):

export function leerLocalSToragePedido() {
    let productosLS
    productosLS = queHayEnLS()
    productosLS.forEach(function(unProducto) {
        const div = document.createElement('div')
        div.classList.add('row', 'py-3', 'mb-3')   // clase del papa div de la card
        div.innerHTML = `
        
        <div class="col-4 mb-1">
          <div class="bg-image rounded">
            <img class="w-100" src="${unProducto.imagen}" alt="${unProducto.titulo}">
          </div>
        </div>

        <div class="col-6">
          <p><strong>${unProducto.titulo}</strong></p>
          <p>${unProducto.tipo}</p>
          <p>${unProducto.calidad}</p>
          <p>${unProducto.precio}</p>

          <a data-id=${unProducto.id} type="button" class=" fa-solid fa-trash-can text-danger btn-sm me-1 mb-2 borrar-producto-tachito"></a>

        </div>

        <div class="col-2">
          <input type="number" min="1" class="form-control text-center cantidad-productos" placeholder="Cantidad" value="${unProducto.cantidad}">
          <p class="text-center mt-2">

          <strong class="precio-final">${unProducto.precio * unProducto.cantidad}</strong></p>
        </div>
        
        `
   listaCompra.appendChild(div)
    })
}



// DARLE FUNCION eliminar AL TACHITO:

export const eliminarProductoTachito = (e) => {
    e.preventDefault
    let unProductoID
    //para que sea al clickear sobre el tachito:
    if (e.target.classList.contains('borrar-producto-tachito')){
        e.target.parentElement.parentElement.remove()
        
        //para que se borre del ls tambien:
        let unProducto = e.target.parentElement.parentElement
        unProductoID = unProducto.querySelector('a').getAttribute('data-id')
    }
    eliminarProductoDelLS(unProductoID)
}



// logica para suma o resta del mismo producto:

export const cambioDeCantidad = (e) => {
    e.preventDefault
    //console.log(e.target)

    let id, cantidad, unProducto, productosLS
    if (e.target.classList.contains('cantidad-productos')) {

        // producto total:
    unProducto = e.target.parentElement.parentElement
    //console.log(unProducto)

        // identificar que elemento cambia:
    id = unProducto.querySelector('a').getAttribute('data-id')
    //console.log(id)

        // identificar la cantidad:
    cantidad = unProducto.querySelector('input').value
    //console.log(cantidad)

        // ahora multiplicar el precio:
   let precioFinal = unProducto.querySelector('.precio-final')
    
    productosLS = queHayEnLS()
    productosLS.forEach(function (unProductoLS, index) {
        if ( unProductoLS.id === id) {   //comparo id ls con id de compra
            unProductoLS.cantidad = cantidad
            //console.log(unProductoLS.cantidad)
            //console.log(unProductoLS.precio)
        
        let total = Number(unProductoLS.cantidad) * Number(unProductoLS.precio)
        precioFinal.textContent = total.toFixed(3)
        //console.log(total)
        }
    })
    localStorage.setItem('productosTodos', JSON.stringify(productosLS))
    calcularTotal()
    }
}



export function calcularTotal() {
    let productosLS
    let total = 0, subtotal = 0, impuestos = 0
    productosLS = queHayEnLS()

    productosLS.forEach( unProductoLS => {
        let totalProducto = Number(unProductoLS.cantidad * unProductoLS.precio)
        total = total + totalProducto
    })
    impuestos = parseFloat(total * 0.18).toFixed(3)
    subtotal = parseFloat(total - impuestos).toFixed(3)
        // lo pasamos a la interfaz:
        document.querySelector('#total').textContent = total.toFixed(3)
        document.querySelector('#iva').textContent = impuestos
        document.querySelector('#sub-total').textContent = subtotal

   
}

