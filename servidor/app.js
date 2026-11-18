const express = require('express');
const app = express();
const nivelRouter = require('./routes/routes_niveles');
const manejoErrores = require('./middlewares/manejoErrores');

// Middlewares globales
app.use(express.json());              // parsea JSON en el body
app.use(express.static('../public'));    // sirve el sitio del TPO 2

// Rutas de la API
app.use('/api/niveles', nivelRouter); // monta el router con prefijo /api/niveles

// Manejo de errores (siempre al final)
app.use(manejoErrores);

module.exports = app;