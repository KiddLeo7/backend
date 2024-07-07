// Aqui va las definicion de las APIs

const express = require('express')
const path = require('path')
const fs = require('fs')
const Archivo = path.join(__dirname, "../../json/movies.json")

// Permitir manejar las rutas URL
const ruta = express.Router()

// Funcion para leer el archivo
// Con esto voy a simular que estoy leyendo una base de datos
const leerDatos = () => {
    let rawData = fs.readFileSync(Archivo)
    let Datos = JSON.parse(rawData)
    return Datos
}

// APi para ller todo el archivo
ruta.get('/findAll', async (req,res) => {
    console.log("invocando a findAll")
    Datos =  await leerDatos()
    res.set("Content","application/json")
    res.json(Datos)
})

// Api para filtrar por pais
ruta.get('/findByCountry/:nombrePais', async (req,res) => {
    const pais = req.params.nombrePais
    console.log( pais )
    Datos = await leerDatos()
    // Filtrar
    const rpta = Datos.filter( (item) => {
        if ( item.country === pais) {
            return item
        }
    })
    res.set("Content","application/json")
    res.json(rpta)
})

// Api para insertar una nueva pelicula
ruta.post('/newPelicula', async(req,res) => {
    console.log("/newPelicula invocado !")
    // Recuperar un objeto JSON
    const obj = req.body
    console.log( obj )

    // Escribir el archivo
    // Ver si ela rchivo existe
    if ( fs.existsSync(Archivo) === false) {
        // Si no existe, crearlo
        fs.writeFileSync(Archivo,  obj)       
    } else {
        // Si ya existe .,. agregar al final
        let Datos = leerDatos()
        Datos.push( obj )
        fs.writeFileSync(Archivo, JSON.stringify(Datos))
    }
    res.set("Content","application/json")
    res.status(201).send("peilucla agregada correctamente").end()
})



module.exports = ruta