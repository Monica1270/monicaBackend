import express from 'express'
const appPruducts = express ();
const PORT = 8080;
let id = 0;


appPruducts.get('/', (request, response) =>{
    id++;
    console.log(`id products ${id}`)
response.send('hola desde Express')
})






appPruducts.listen(PORT, ()=> {
   
    console.log(`Servidor con Express ${PORT}`);
})