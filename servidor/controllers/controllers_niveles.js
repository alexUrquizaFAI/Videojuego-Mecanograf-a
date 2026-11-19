// req(la peticion del cliente: query, params, body) y res es la respuesta que se devuelve
// Exportamos el objeto 'services' que tendran todas las funciones de este programa 
const nivelesService = require('../services/services_niveles');

// Esta funcion lo que lograra sera GET /api/niveles
function listarNiveles(req, res) {
    // query dara siempre un String
    const cantidad = parseInt(req.query.cantidad) || 10;

    const from = parseInt(req.query.from) || 0;

    const resultado = nivelesService.obtenerNiveles(cantidad, from);

    // Seteamos el status code con una respuesta de 200, lo cual significa que esta todo bien
    // Luego enviamos el erray como JSON
    res.status(200).json(resultado);
}

function obtenerNivel(req, res) {
    const id = parseInt(req.params.id);

    const nivel = nivelesService.obtenerNivelId(id);

    if(!nivel) {
        res.status(404).json({error:' No existe el nivel con la id ${id}'});
    }

    res.status(200).json(nivel);
}

function crearNivel(req, res) {
    // Objeto con los datos que el cliente mando en el cuerpo de la peticion(en formado JSON)
    const {nombre, dificultad, tiempoLimite, enemigos, descripcion} = req.body;

    const nuevo = nivelesService.crearNivel({nombre, dificultad, tiempoLimite, enemigos, descripcion});

    // 201 es el estatus code correcto cuando se crea un nuevo recurso
    res.status(201).json(nuevo);
}

function actualizarNivel(req, res) {
    const id =parseInt(req.params.id);

    const actualizado = nivelesService.actualizarNivel(id, req.body);

    if(!actualizado) {
        res.status(404).json({error:`No existe el nivel con id ${id}`});
    }

    res.status(200).json(actualizado);
}

module.exports = {
    listarNiveles,
    obtenerNivel,
    crearNivel,
    actualizarNivel
};