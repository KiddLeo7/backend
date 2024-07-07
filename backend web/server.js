const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');
const cors = require('cors')

// Registrar las apis
const peli = require('./api/peliculas/pelicula.js')
const pedidos = require('./api/tienda/apis.js')
const pedido2 = require ('./api/pedido/pedidos.js')
const resultadosBusquedaRouter = require('./api/resultadosBusqueda')
const usuariosRouter = require('./api/usuarios')
const productosRouter = require('./api/productos')

const app = express()
const port = 3080

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

const whiteList = ['http://localhost:5173']
app.use(cors(whiteList))

// Mapear la api con la URL de invocacion
app.use('/api/peliculas', peli)
app.use('/api/tienda', pedidos)
app.use('/api/pedido',pedido2)
app.use('/api/productos', productosRouter)
app.use('/api/resultados-busqueda', resultadosBusquedaRouter)
app.use('/api/usuarios', usuariosRouter)

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});

