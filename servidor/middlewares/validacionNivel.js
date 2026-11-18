function validarNivel(req, res, next) {
    const { nombre, dificultad, tiempoLimite, enemigos, descripcion } = req.body;

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ error: "El campo 'nombre' es obligatorio y debe ser texto no vacío" });
    }

    const dificultadesValidas = ['Facil', 'Normal', 'Dificil'];
    if (!dificultad || !dificultadesValidas.includes(dificultad)) {
        return res.status(400).json({
            error: `El campo 'dificultad' es obligatorio y debe ser uno de: ${dificultadesValidas.join(', ')}`
        });
    }

    if (typeof tiempoLimite !== 'number' || tiempoLimite <= 0) {
        return res.status(400).json({ error: "El campo 'tiempoLimite' es obligatorio y debe ser un número mayor a 0" });
    }

    if (typeof enemigos !== 'number' || enemigos < 0) {
        return res.status(400).json({ error: "El campo 'enemigos' es obligatorio y debe ser un número mayor o igual a 0" });
    }

    if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
        return res.status(400).json({ error: "El campo 'descripcion' es obligatorio y debe ser texto no vacío" });
    }

    // Todo OK → pasa al controlador
    next();
}

module.exports = validarNivel;