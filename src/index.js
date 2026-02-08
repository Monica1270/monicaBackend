import express, { request, response } from 'express';
import productsData from '../data/products.json' with {type: 'json'};
import path from 'path';
import { writeFile, readFile } from "fs/promises"

// configuracion de express = mensajero
const PORT = 8080
const app = express()
app.use(express.json())

// Generar las api y prodctus
// Esta ruta tiene que: traer todos los productos del array
app.get('/api/products', (request, response) => {
    console.log('Estoy haciendo get en /api/prodcuts')
    // response.send(productsData) => devuelve los datos de el arry
    // response.send('productsData') => devuelve el string productsData
    response.send(productsData)
})

// Esta ruta ruta tiene que: traer solo el producto mediante el id
app.get('/api/products/:pid', (request, response) => {
    console.log('Estoy haciendo un get en /api/products/:pid')
    const productId = request.params.pid
    console.log('productId tiene ', productId)
    const selectedProduct = productsData.find(product => product.id == productId);
    //mi error fue que no definia el status, ni data
    if (selectedProduct) {
        response.json({
            status: 'Exitoso',
            data: selectedProduct
        })
    } else {
        response.status(404).json({
            status: 'Error',
            msg: 'Producto no encontrado'
        })
    }
})

//Esta ruta tiene que: crear un producto nuevo
app.post('/api/products', async (request, response) => {
    console.log('Estoy haciendo un post en /api/products')
    // 1. confirmamos que el paquete llega
    const paqueteRecibido = request.body
    // 2.preparar producto para el guardado
    // 2.1 leer base de datos
    const cantidadProductos = productsData.length
    const ultimoProducto = productsData.at(cantidadProductos - 1)
    // crear el nuevo producto
    const nuevoProducto = {
        id: ultimoProducto.id + 1,
        title: paqueteRecibido.title,
        code: paqueteRecibido.code,
        price: paqueteRecibido.price,
        status: paqueteRecibido.status,
        stock: paqueteRecibido.stock,
        category: paqueteRecibido.category,
        thumbnails: paqueteRecibido.thumbnails
    }

    productsData.push(nuevoProducto)

    //Estas dos lineas es  para guardar en el archivo array
    const text = JSON.stringify(productsData, null, 2)
    await writeFile('./data/products.json', text)

    response.json({
        verb: "POST",
        msj: "Se guardo el nuevo producto en la base de datos"
    })
})

//Esta ruta tiene que pedir un producto
app.put('/api/products/:pid', (request, response) => {
    console.log('Estoy haciendo un put en /api/products/:pid')

    response.json({
        verb: "put",
        msj: "qqq"
    })
})

//Esta ruta tiene que borrar un producto
app.delete('/api/products/:pid', (request, response) => {
    console.log('Estoy haciendo un delete en /api/products/:pid')
    // 1. Confirmar que recibi el pid   
    const productId = request.params.pid
    // 2. leer toda la base de datos
    const copiaDeDb = productsData
    // 3. confirmar si existe algun producto en la array cuyo id sea = al pid recibido
    const existeProducto = copiaDeDb.find(product => product.id == productId);
    // 4. SI existe borrar el producto de la base de dato caso contrario responder no encontro un producto con ese pid
    if (existeProducto){
    copiaDeDb = copiaDeDb.filter(product => product.id != productId)
    return response.json({
        verb:'Delete',
        msg:'El producto se ha eliminado'
    })   
    } else {
    response.status(404).json({
        verb:'Delete',
        msg:'El producto no se ha encontrado'
    })
    }
    // 5. Eliminar el producto de la array 

    // 6. guardar el array en el archivo 
    // 7. responder que el producto se elimino  
    response.json({
        verb: "delete",
        msj: `El producto: ${pid} fue eliminado correctamente`
    })
})

//Esta ruta tiene que: crear una api carts
app.post('/api/carts', (request, response) => {
    console.log('Estoy haciendo un post en /api/carts')
    response.json({
        verb: "POST",
        msj: "qqq"
    })
})

app.get('/api/carts/:cid', (request, response) => {
    console.log('Estoy haciendo un get en /api/carts/:cid')
    response.json({
        verb: "get",
        msj: "qqq"
    })
})

app.post('/api/carts/:cid/product/:pid', (request, response) => {
    console.log('Estoy haciendo un get en /api/carts/:cid/product/:pid')
    response.json({
        verb: "POST",
        msj: "qqq"
    })
})



app.listen(PORT, () => {
    console.log(`Servidor con Express ${PORT}`);
})