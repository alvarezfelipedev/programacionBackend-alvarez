import express from 'express'
import database from './db/knex.js'

const app = express()
const server = app.listen(3000, () => console.log('http://localhost:3000'))

// cargamos los usuarios
const users = [
    { first_name: "Rodrigo", last_name: "Alvaro", age: 21, email: "rodri@gmail.com", gender: "male" },
    { first_name: "Lucas", last_name: "Alvarez", age: 22, email: "lucas@gmail.com", gender: "male" },
    { first_name: "Juana", last_name: "Rodriguez", age: 18, email: "juana@gmail.com", gender: "female" },
    { first_name: "Josefina", last_name: "Simon", age: 25, email: "josefina@gmail.com", gender: "female" }
]

app.get('/', async (req, res) => {
    // seleccionamos usuarios donde la edad es < 21
    let result = await database('users').select('*')
    // let result = await database('users').select('first_name', 'age', 'email').where('gender', 'female')
    console.log(result);
    res.send({ result })
})

app.get('/usersInsertion', async (req, res) => {
    // insertamos usuarios
    let result = await database('users').insert(users);
    res.send({ result })
})

app.get('/usersdelete', async (req, res) => {
    // eliminamos todos los usuarios
    let result = await database('users').del()
    res.send({ result })
})

app.get('/updateUser', async (req, res) => {
    // actualizamos la edad de los hombres a 30
    const updateAge = { age: 30 }
    let result = await database('users').where('gender', 'male').update(updateAge)
    res.send({ result })
})

app.get('/deleteUser', async (req, res) => {
    // eliminamos al usuario con ID: 9
    let result = await database('users').where('id', 9).del()
    res.send({ result })
})