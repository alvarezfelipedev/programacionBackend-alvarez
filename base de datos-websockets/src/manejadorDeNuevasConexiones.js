import { ContenedorArchivo } from './ContenedorArchivo.js'
import db from './db/knex.js';

const contenedorMensajes = new ContenedorArchivo(db)

try {
  let exists = await db.schema.hasTable('chat')

  if (!exists) {
    await db.schema.createTable('chat', table => {
      table.string('fecha');
      table.string('mail');
      table.string('mensaje').nullable(false)
    })
  }
}
catch {
  console.log(error);
}

export function configurarSocket(io) {
  io.on("connection", (socket) => {
    socket.emit("mensaje", "hola! gracias por conectarte");

    socket.on("mensaje", async (mensaje) => {
      await contenedorMensajes.guardar('chat', mensaje);
      const mensajes = await contenedorMensajes.recuperar('chat');
      io.sockets.emit("mensajes", mensajes);
    });
  });
}
