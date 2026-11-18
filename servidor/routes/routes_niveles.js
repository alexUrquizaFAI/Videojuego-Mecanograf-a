const express = require('express');

const router = express.Router();

const nivelController = require('../controllers/controllers_niveles');

const validarNivel = require('../middlewares/validacionNivel');

// GET /api/libros?cantidad=10&from=0 --> Listar varios niveles
router.get('/', nivelController.listarNiveles);

// GET /api/libros/:id  → obtener uno (404 si no existe)
router.get('/:id', nivelController.obtenerNivel);

// POST /api/libros  → crear uno (valida body; 400 si falla)
router.post('/', validarNivel, nivelController.crearNivel);

// PUT /api/libros/:id  → actualizar uno (valida body; 404 si no existe; 400 si falla)
router.put('/:id', validarNivel, nivelController.actualizarNivel);

module.exports = router;