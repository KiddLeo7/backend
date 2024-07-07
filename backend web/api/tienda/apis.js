const express = require('express')
const path = require('path')
const fs = require('fs')
const Archivo = path.join(__dirname, "../../json/addresses.json")


const ruta = express.Router()

const leerDatos = () => {
    let rawData = fs.readFileSync(Archivo)
    let Datos = JSON.parse(rawData)
    return Datos
}

ruta.post('/newPedido', async(req,res) => {
    console.log("/newPedido invocado !")
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
    res.status(201).send("Orden agregada correctamente").end()
})



module.exports = ruta