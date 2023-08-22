import { resolve } from 'node:path'

export default {
    server: {
        port: "3232",
    },
    css : {
        devSourcemap : true,
    },
    build: {
        emptyOurDir: true,
        rollupOptions: {
            input: {
                carrito: resolve('pages/carrito.html'),
                contacto: resolve('pages/contacto.html'),
                nosotros: resolve('pages/nosotros.html'),
                inicio: resolve('index.html')
            }
        }
    }
}