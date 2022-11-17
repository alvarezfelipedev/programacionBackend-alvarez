const socket = io()

const addProducto = document.querySelector('#addProducto')
addProducto.addEventListener('submit', (e) => {
  e.preventDefault()

  const producto = {
    producto: document.querySelector('#producto').value,
    precio: document.querySelector('#precio').value,
    url: document.querySelector('#url').value
  }

  socket.emit('addProducto', producto)

  document.querySelector('#producto').value = ''
  document.querySelector('#precio').value = ''
  document.querySelector('#url').value = ''
})

async function generarProducto(productos) {
  const template = await fetch(`/plantilla/productos.hbs`)
  const textTemplate = await template.text()
  const functionTemplate = Handlebars.compile(textTemplate)
  const html = functionTemplate({ productos })

  document.querySelector('#productos').innerHTML = html
}

socket.on('productos', generarProducto)
