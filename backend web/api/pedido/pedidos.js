const express = require('express')
const db = require('../../db/models/index.js')
const address = require('../../db/models/address.js')
const client2 = require('../../db/models/client2.js')

const sequelize = require('sequelize')
const ruta = express.Router()

ruta.get('/d2', async(req,res) => {
    console.log("invocando a d2")
    
    let direcciones = await db.address.findAll({

    })
res.status(200).json(paises2)
    })

    module.exports = ruta

