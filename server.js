const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Persistencia
const productos = []

app.use(express.static('public'))

httpServer.listen(3000, () => console.log(`http://localhost:3000`))

io.on('connection', (socket) => {

  socket.emit('productos', productos)

  socket.on('addProducto', data => {
    productos.push(data)
    io.sockets.emit('productos', productos)
  })
})
