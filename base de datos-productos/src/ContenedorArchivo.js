export class ContenedorArchivo {
  constructor(ruta) {
    this.conexCli = ruta;
  }

  async guardar(tabla, elemento) {
    await this.conexCli.insert(elemento).into(tabla)
  }

  async recuperar(tabla) {
    return await this.conexCli.select('*').from(tabla)
  }
}
