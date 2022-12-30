import knex from 'knex'

const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions)

export default db;