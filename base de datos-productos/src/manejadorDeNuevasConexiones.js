import { ContenedorArchivo } from './ContenedorArchivo.js'
import db from './db/knex.js';

const contenedorMensajes = new ContenedorArchivo(db)

try {
  let exists = await db.schema.hasTable('products')

  if (!exists) {
    await db.schema.createTable('products', table => {
      table.increments('id')
      table.string('producto').nullable(false)
      table.string('precio').nullable(false)
      table.string('url').nullable(false)
    })
  }
}
catch (error) {
  console.log(error);
}

export function configurarSocket(io) {
  // servidor a cliente
  io.on("connection", (socket) => {
    // mensaje del servidor al cliente
    socket.emit("mensaje", "hola! gracias por conectarte");


    socket.on("addProducto", async (producto) => {
      await contenedorMensajes.guardar('products', producto);
      const products = await contenedorMensajes.recuperar('products');
      io.sockets.emit("delvoverProductos", products);
    });
  });
}
