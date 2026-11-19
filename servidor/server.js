const app = require('./app');
const { PORT } = require('./config/config_niveles');

app.listen(PORT, () => {
    console.log(`Servidor DAXER  http://localhost:${PORT}`);
    console.log(`API de niveles: http://localhost:${PORT}/api/niveles`);
    console.log(`Sitio web:      http://localhost:${PORT}/index.html`);
});