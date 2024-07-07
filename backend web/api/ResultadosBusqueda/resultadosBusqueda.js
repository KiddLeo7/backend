const express = require('express');
const path = require('path');
const fsPromises = require('fs/promises');

const router = express.Router();

// Función para leer JSON
const leerArchivoJson = async (rutaArchivo) => {
    try {
        const datos = await fsPromises.readFile(rutaArchivo, 'utf-8');
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
};

// Busqueda de resultados
router.get('/', async (req, res) => {
    const terminoBusqueda = req.query.q || '';
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');

    try {
        const datos = await leerArchivoJson(rutaArchivo);
        const resultados = datos.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.serie.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.marca.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;

