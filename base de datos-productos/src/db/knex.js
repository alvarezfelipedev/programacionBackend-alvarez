import knex from 'knex'

const mysqlOptions = {
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:'',
        database:'ecommerce'
    }
} 

const db = knex(mysqlOptions)

export default db;