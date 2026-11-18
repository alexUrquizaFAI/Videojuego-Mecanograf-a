function manejoErrores(err, req, res, next) {
    // 1. Loguear para el desarrollador
    console.error('Error capturado:', err.message || err);
    console.error('Ruta afectada:', req.method, req.originalUrl);

    // 2. Determinar status
    const status = err.status || 500;

    // 3. Determinar mensaje (no exponer detalles internos en 500)
    const mensaje = status === 500
        ? 'Error interno del servidor'
        : (err.message || 'Ocurrió un error');

    // 4. Responder
    res.status(status).json({ error: mensaje });
}

module.exports = manejoErrores;