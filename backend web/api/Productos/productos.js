const express = require('express');
const path = require('path');
const fsPromises = require('fs/promises');
const router = express.Router();

const leerArchivoJson = async (rutaArchivo) => {
    try {
        const datos = await fsPromises.readFile(rutaArchivo, 'utf-8');
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
};

const escribirArchivoJson = async (rutaArchivo, datos) => {
    try {
        await fsPromises.writeFile(rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al escribir el archivo JSON:', error);
        throw error;
    }
};

// Obtener todos los productos
router.get('/', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Obtener un producto específico por su ID
router.get('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const id = req.params.id;
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        const producto = productos.find(p => p.id === id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Obtener los productos más vendidos
router.get('/mas-vendidos', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        const masVendidos = productos
            .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
            .slice(0, 12); // Obtén los 12 productos más vendidos

        res.status(200).json(masVendidos);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Obtener los productos nuevos
router.get('/nuevos', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        const nuevos = productos
            .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso))
            .slice(0, 6); // Obtén los 6 productos más nuevos

        res.status(200).json(nuevos);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Obtener los productos en oferta
router.get('/ofertas', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        const ofertas = productos.filter(producto => producto.enOferta);

        res.status(200).json(ofertas);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const nuevoProducto = req.body;
    nuevoProducto.id = Date.now().toString(); // Generar un ID único para el producto
    try {
        const productos = await leerArchivoJson(rutaArchivo);
        productos.push(nuevoProducto);
        await escribirArchivoJson(rutaArchivo, productos);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const id = req.params.id;
    const productoActualizado = req.body;
    try {
        let productos = await leerArchivoJson(rutaArchivo);
        productos = productos.map(p => (p.id === id ? { ...productoActualizado, id } : p));
        await escribirArchivoJson(rutaArchivo, productos);
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const id = req.params.id;
    try {
        let productos = await leerArchivoJson(rutaArchivo);
        productos = productos.filter(p => p.id !== id);
        await escribirArchivoJson(rutaArchivo, productos);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Activar un producto
router.put('/:id/activar', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const id = req.params.id;
    try {
        let productos = await leerArchivoJson(rutaArchivo);
        productos = productos.map(p => (p.id === id ? { ...p, activo: true } : p));
        await escribirArchivoJson(rutaArchivo, productos);
        res.status(200).json(productos.find(p => p.id === id));
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Desactivar un producto
router.put('/:id/desactivar', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/productos.json');
    const id = req.params.id;
    try {
        let productos = await leerArchivoJson(rutaArchivo);
        productos = productos.map(p => (p.id === id ? { ...p, activo: false } : p));
        await escribirArchivoJson(rutaArchivo, productos);
        res.status(200).json(productos.find(p => p.id === id));
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
