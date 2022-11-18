/* 
* Archivo de configuración de la aplicación
* En este archivo se configuran los parámetros de la aplicación
* como ser: el puerto, variables de entorno, rutas y middlewares 
*/

const express = require('express')
const cors = require('cors')
const dbConnection = require('./db/conexion')
require('dotenv').config()
const morgan = require('morgan')

//Inicializaciones

const app = express()
dbConnection()

//Settings
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
//Archivos estaticos


//Routes

app.use(require('./routes/tasks.routes'))
app.use(require('./routes/user.routes'))
app.use(require('./routes/auth.routes'))


//Inicializar servidor
app.listen(port,()=>{
    console.log(`Servidor inicializado en el puerto ${port}`)
})