// DESAFIO CLASE 6 , Nahuel de los Santos

const express = require('express')
const app = express()
const puerto = 8081
const fs = require('fs')
const fecha = new Date()

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }
    async getAll(){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'));
            return (data ? data : 'El archivo tiene un problema o se encuentra vacio')
        }
        catch(err){
            console.log(`Hubo un error: ${err}`)
        }
    }
}

app.listen(puerto, (err)=>{
    if(!err){
        console.log(`Servidor escuchando el puerto ${puerto}`)
    }else{
        console.log(`Hubo un error: ${err}`)
    }
})
app.get('/', (req, res) =>{
    res.send("<h1 style= color:blue>Bienvenidos al servidor express /express.js</h1>")
})

app.get('/productos',async (req, res) =>{
    let prods = await new Contenedor('productos.txt').getAll()
    res.send(`<h1> Productos traidos desde "productos.txt"</h1> 
    <div>${prods.map(prod =>{
        let productos = `<section><p>${prod.nombre}</p> <img>${prod.thumbnail}</img> <p>${prod.precio}</p></section> <br>`
        return productos
    })}</div>`)
})

app.get('/productoRandom', async (req, res)=>{
    let prods = await new Contenedor('productos.txt').getAll()
    let random = Math.floor( Math.random() * prods.length);
    res.send(`
        <div>
        <section>${prods[random].nombre} <br><br>
         <img>${prods[random].thumbnail}</img> <br><br>
        ${prods[random].precio} </section>
        </div>
    `)
})