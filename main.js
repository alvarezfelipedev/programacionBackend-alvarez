const { clear } = require("console");
const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
  leer() {
    try {
      const dato = fs.readFileSync(this.nombre, "utf-8");
      return dato;
    } catch (err) {
      console.log(err);
    }
  }
  async save(objeto) {
    try {
      const contenido = this.leer();
      const dato = JSON.parse(contenido);

      if (dato.length == 0) {
        objeto.id = 1;
      } else {
        const ultimoObjeto = dato[dato.length - 1];
        objeto.id = ultimoObjeto.id + 1;
      }

      dato.push(objeto);

      fs.promises.writeFile(this.nombre, JSON.stringify(dato));
      return objeto.id;
    } catch (error) {
      console.log("error");
    }
  }
  async getById(number) {
    try {
      const contenido = await fs.promises.readFile(this.nombre, "utf-8");
      const dato = JSON.parse(contenido);
      const response = dato.find((obj) => obj.id == number);
      return response != undefined ? JSON.stringify(response) : null;
    } catch (err) {
      console.log("no hay objetos con ese ID");
      return null;
    }
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.nombre, "utf-8");
      const dato = JSON.parse(contenido);
      return dato;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(number) {
    try {
      const products = await fs.promises.readFile(this.nombre, "utf-8");
      const dato = JSON.parse(products);
      if (dato.length != 0) {
        const nuevoDato = dato.filter((obj) => obj.id !== number);
        console.log("ingrese el nuevo objeto: ");
        console.log(nuevoDato);
        fs.writeFile(this.nombre, JSON.stringify(nuevoDato), (error) => {
          if (error) {
            console.log("error");
          } else {
            console.log("archivo modificado");
          }
        });
      } else {
        console.log("no hay objetos con ese ID");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    await fs.promises
      .writeFile(this.nombre, JSON.stringify([]))
      .then(console.log("se eliminaron todos los objetos"))
      .catch(console.log("no se pudo borrar los elementos"));
  }
}

const archivo = new Contenedor("productos.txt");
archivo.save({ title: "auto", price: 10000, thumbnail: "auto.webp" });
archivo.getById(1).then((response) => {
  console.log(response);
});
archivo.getAll().then((response) => {
  console.log(response);
});
archivo.deleteById(2);
setTimeout(() => {
  archivo.deleteAll();
}, 2000);
