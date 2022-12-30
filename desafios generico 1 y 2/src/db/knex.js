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

const sqliteOptions = {
    client:"sqlite3",
    connection: {
        filename:"./sqliteDatabase.sqlite"
    },
    useNullAsDefault: true
}


const db = knex(sqliteOptions)

try{
    let exists = await db.schema.hasTable('articulos')

        // no se creó la tabla 'id'
    if (!exists) {
        await db.schema.createTable('articulos', table => {
            table.primary('id');
            table.increments('id');
            table.string('nombre', 15).nullable(false);
            table.string('codigo', 10).nullable(false);
            table.float('precio');
            table.integer('stock',).defaultTo(0);
        })
    }
}
catch{
    console.log(error);
}

export default db;