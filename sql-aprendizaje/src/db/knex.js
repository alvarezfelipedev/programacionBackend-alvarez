import knex from 'knex'

const mysqlOptions = {
    client: "mysql",
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coderhouse'
    }
}

const sqliteOptions = {
    client:"sqlite3",
    connection: {
        filename:"./sqliteDatabase.sqlite"
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions)

try {
    let exists = await db.schema.hasTable('users')

    if (!exists) {
        await db.schema.createTable('users', table => {
            table.primary('id');
            table.increments('id');
            // id INT AUTO_INCREMENTS, PRIMARY KEY ('ID');
            table.string('first_name', 35).nullable(false);
            table.string('last_name', 20).nullable(false);
            table.string('email', 25).nullable(false);
            table.integer('age', 11);
            table.string('gender', 15);
        })
    }

    // let exists = await db.schema.hasTable('products');

    // if ( !exists ) {
    //     await db.schema.createTable('products', table => {
    //         table.primary('id')
    //         table.increments('id')
    //         table.string('title', 30).nullable()
    //         table.string('description', 100)
    //         table.integer('stock').defaultTo(0)
    //         table.string('code', 10).unique(true) 
    //         // unique = hace q' el codigo no se repita
            

    //     })
    // }
}
catch {
    console.log(error);
}
export default db;