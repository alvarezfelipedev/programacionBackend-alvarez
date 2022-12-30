import express from 'express';
import database from './db/knex.js'

const app = express()
const server = app.listen(3000, () => console.log('http://localhost:3000'))

// cargamos los articulos

const articulos = [
    { nombre: "Arroz", codigo: "1122874880", precio: 23, stock: 5 },
    { nombre: "Fideos", codigo: "1163684133", precio: 13, stock: 5 },
    { nombre: "Pure", codigo: "1122224880", precio: 3, stock: 5 },
    { nombre: "Papa", codigo: "1155874880", precio: 25, stock: 5 },
    { nombre: "Zapallo", codigo: "0022874880", precio: 12, stock: 5 },
]

// hacer los get
app.get('/', async (req, res) => {
    let result = await database('articulos').select('*')
    console.log(result);
    res.send({ result })
})

app.get('/articulosInsertion', async (req, res) => {
    let result = await database('articulos').insert(articulos);
    res.send({ result })
})

// no elimina el articulo
app.get('/articulosDelete', async (req, res) => {
    let result = await database('articulos').where('id', '=', 3).del()
    console.log(result);
    res.send({ articulos });
})

app.get('/articuloUpdate', async (req, res) => {
    const updatePrecio = { precio: 40 }
    let result = await database('articulos').where('precio', '=', 12).update(updatePrecio)
    console.log(result);
    res.send({ result })
})