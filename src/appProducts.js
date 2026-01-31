import express from 'express';
const appProducts = express();
const PORT = 8080;
let id = 0;


appProducts.get('/', (request, response) =>{
    // el request es lo que pide el cliente por el momento esta pidien la raiz'/'
    // depues puede estar pidiendo mas cosasc
    //yo cada vez que hago un refrescar en el local
    //se va aumentado el id en la terminal
    id++;
    console.log(`id products ${id}`);
response.send('hola desde Express');
});






appProducts.listen(PORT, ()=> {
   
    console.log(`Servidor con Express ${PORT}`);
})