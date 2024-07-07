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

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    try {
        const usuarios = await leerArchivoJson(rutaArchivo);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Obtener un usuario específico por su ID
router.get('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    const id = req.params.id;
    try {
        const usuarios = await leerArchivoJson(rutaArchivo);
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Registrar un nuevo usuario
router.post('/', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    const nuevoUsuario = req.body;
    nuevoUsuario.id = Date.now().toString(); // Generar un ID único para el usuario
    try {
        const usuarios = await leerArchivoJson(rutaArchivo);
        usuarios.push(nuevoUsuario);
        await escribirArchivoJson(rutaArchivo, usuarios);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Actualizar un usuario existente
router.put('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    const id = req.params.id;
    const usuarioActualizado = req.body;
    try {
        let usuarios = await leerArchivoJson(rutaArchivo);
        usuarios = usuarios.map(u => (u.id === id ? { ...usuarioActualizado, id } : u));
        await escribirArchivoJson(rutaArchivo, usuarios);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    const id = req.params.id;
    try {
        let usuarios = await leerArchivoJson(rutaArchivo);
        usuarios = usuarios.filter(u => u.id !== id);
        await escribirArchivoJson(rutaArchivo, usuarios);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Cambiar la contraseña de un usuario
router.put('/:id/cambiar-password', async (req, res) => {
    const rutaArchivo = path.join(__dirname, '../../json/usuarios.json');
    const id = req.params.id;
    const nuevaPassword = req.body.password;
    try {
        let usuarios = await leerArchivoJson(rutaArchivo);
        let usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            usuario.password = nuevaPassword;
            await escribirArchivoJson(rutaArchivo, usuarios);
            res.status(200).json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
