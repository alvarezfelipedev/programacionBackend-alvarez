const fs = require("fs");
const express = require("express");
const { response } = require("express");
const app = express();

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

let miArchivo = new Contenedor("./productos.txt");


app.get("/productos", (req, res) => {
  miArchivo.getAll().then((response) => {
    res.end(`todo los productos: ${JSON.stringify(response)}`);
  });
});

app.get("/productosRandom", (req, res) => {
    let numeroRandom =  parseInt((Math.random() * 3))+1
    miArchivo.getById(numeroRandom).then(response => {
        res.end(response)
    })
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("http://localhost:8080"));
