// Indicamos el archivos que queremos exportar con las entidades creadas
const niveles = require('../datos_niveles/niveles');

// Es una funcion que busca una cantidad de niveles con: cantidad --> lo niveles y from --> desde que posicion arranca
function obtenerNiveles(cantidad, from) {
    // Si el from es null o similar entonces le damos el valor 0 al inicio
    const inicio = from || 0;
    // Indicamos la posicion final
    const fin = inicio + (cantidad || 10);
    // Devolvemos un nuevo arreglo con los elementos desde el inicio al fin
    return niveles.slice(inicio, fin);
}

// Funcion que busca un solo nivel por id
function obtenerNivelId(id) {
    // find recorre el arreglo y devuelve el primer elemento encontrado sino devolvera un valor nulo
    // => es de comparacion entonces compara el objeto actual con el id buscado
    return niveles.find(nivel => nivel.id === id) || null;
}


    //Funcion que crea niveles recibiendo los datos de un nivel como parametro
function crearNivel(datos) {
    // ? es un operador ternario donde si la condicion es verdadera entonces de hace lo de la izquierda sino lo de la derecha
    // map crea un nuevo arreglo solo con los id
    // (...) por cada id que encuentra, lo deja como un argumento distinto 
    const nuevoId = niveles.length > 0 ? Math.max(...niveles.map(nivel => nivel.id)) + 1 : 1
    // Creamos un nuevo nivel
    const nuevoNivel = {id: nuevoId, ...datos};
    // Agreagamos el nuevo nivel al final del arreglo
    niveles.push(nuevoNivel);

    return nuevoNivel
}


// Funcion que actualizara un nivel
function actualizarNivel(id, datos) {
    const indice = niveles.findIndex(nivel => nivel.id === id);

    // CORREGIDO: Usamos let en vez de const, o directamente retornamos.
    let nivelActualizado = null;

    if (indice !== -1) { // Usamos !== en vez de != por buena práctica
        niveles[indice] = { ...niveles[indice], ...datos, id };
        nivelActualizado = niveles[indice];
    }

    return nivelActualizado;
}

// Exportamos un objeto que contendra todas las funciones para que los demas archivos puedan usarlas con require
module.exports = {
    obtenerNiveles,
    obtenerNivelId,
    actualizarNivel,
    crearNivel
};