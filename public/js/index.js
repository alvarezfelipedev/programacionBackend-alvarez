const socket = io();

const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  const mail = document.getElementById("inputMail").value;
  const mensaje = document.getElementById("inputMensaje").value;
  const fecha = new Date();
  socket.emit("mensaje", { mensaje, mail, fecha });
});

socket.on("mensaje", (mensaje) => {
  console.log(mensaje);
});

socket.on("mensajes", (mensajes) => {
  console.log(mensajes);
  actualizarMensajes(mensajes);
});

function actualizarMensajes(mensajes) {
  const contenido = `<ul>${mensajes
    .map((c) => `<li> ${c.fecha} ${c.mail}: ${c.mensaje}</li>`)
    .join("")}</ul>`;
  document.getElementById("areaMensajes").innerHTML = contenido;
}
