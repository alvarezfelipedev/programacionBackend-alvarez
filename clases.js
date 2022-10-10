class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.libros = libros,
            this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push( { nombre: nombre, autor: autor } )
    }

    getBookNames() {
        return this.libros.map(libros => libros.nombre)
    }
}

const u = new Usuario('felipe', 'alvarez', [{ nombre: 'Caperucita Roja y los 78 enanitos', autor: 'Desconocido' }], ['Lucy', 'Picu']);

console.log(u);

console.log(`Mi usuario es: ${u.getFullName()}`);


u.addMascota("Peperoni");
console.log(`Las mascotas del usuario son: ${u.mascotas} y su cantidad es: ${u.countMascotas()}`);

u.addBook('josesito el furioso', 'Jose de San Martin');
console.log(u.libros);

console.log(`Los libros que tiene son ${u.getBookNames()}`)