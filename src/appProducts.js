import express from 'express';
import products from '../data/products.json' with {type: 'json'};
const appProducts = express();
appProducts.use(express.json());
const PORT = 8080;
let id = 0;
let idPost = 0;
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
appProducts.get('/products', (request, response)=>{

response.json(products);
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
appProducts.post('/', (request, response) =>{
    idPost++;
    console.log(`id products ${idPost}`);
response.send(`El codigo de identificación de su producto es  ${idPost}`);
});
appProducts.post('/products/:idPost', (request, response)=>{
console.log('guardando array')
const {body} = request;
const {title, description, price, status, stock, category, thumbnails}= request.body;
//aqui le digo que me suba al array 
products.push({
    idPost,
    title, 
    description, 
    price, 
    status,
     stock,
     category, 
     thumbnails

})
});






appProducts.listen(PORT, ()=> {
   
    console.log(`Servidor con Express ${PORT}`);
})