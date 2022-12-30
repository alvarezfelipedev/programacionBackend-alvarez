const socket = io();

const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  const mail = document.getElementById("inputMail").value;
  const mensaje = document.getElementById("inputMensaje").value;
  const fecha = new Date().toLocaleString();
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
    .map((c) => `
    <div>
    <b style="color:blue;"> ${c.fecha}</b>
    (<span style="color:black;">${c.mail}</span>)
    <i style="color:green;">${c.mensaje}</i>
    </div>
    `)
    .join("")}</ul>`;
  document.getElementById("areaMensajes").innerHTML = contenido;
}
