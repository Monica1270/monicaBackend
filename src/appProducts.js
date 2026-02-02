import express from 'express';
const appProducts = express();
const PORT = 8080;
let id = 0;
const producto = './data/products.json'
// cree la ruta raiz.
appProducts.get('/', (request, response) =>{
    // el request es lo que pide el cliente por el momento esta pidien la raiz'/'
    // depues puede estar pidiendo mas cosasc
    //yo cada vez que hago un refrescar en el local
    //se va aumentado el id en la terminal
    id++;
    console.log(`id products ${id}`);
response.send(`<h1>El codigo de identificación de su producto es  ${id}</h1>`);
});
// creo la ruta de productos que devuelve un json
//creo una constante del producto para que llame al nombre del producnto
appProducts.get('/', (request, response)=>{
const product = {
    id:0,
    product:'namber',
}
response.json(product);
});

//Ruta dinámica para buscar: el producto con id
appProducts.get('/products/:id', (request, response)=>{
    const Id = request.params.id;   
const producto = producto.find(product=>product.id == id);
if(producto)
response.json({
    status: 'succes',
    data: 'producto'
})
else{
    response.status(404).json({
    status: 'succes',
    data: 'producto'
})
}
});






appProducts.listen(PORT, ()=> {
   
    console.log(`Servidor con Express ${PORT}`);
})