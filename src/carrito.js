const listaDeProductos = document.querySelector('#lista-carrito tbody')
//console.log(listaDeProductos)


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
        id: unProducto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //console.log(infoProducto)      //comprobe que esta bien.


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




