/* 
* Archivo de configuración de la aplicación
* En este archivo se configuran los parámetros de la aplicación
* como ser: el puerto, variables de entorno, rutas y middlewares 
*/

const express = require('express')
const cors = require('cors')
const dbConnection = require('./src/db/conexion')
require('dotenv').config()
const path = require('path')
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
app.use(express.urlencoded({extended: false}))
//Archivos estaticos


//Routes

app.use(require('./src/routes/tasks.routes'))
app.use(require('./src/routes/user.routes'))
app.use(require('./src/routes/auth.routes'))
app.use(require('./src/routes/routesComent'))
app.use(require('./src/routes/profile.routes'))
app.use(require('./src/routes/notifications.routes'))
app.use('/api/histories', require('./src/routes/clinicHistory.routes'))

//Static Files
app.use(express.static(path.join(__dirname, 'public')))

//Inicializar servidor
app.listen(port,()=>{
    console.log(`Servidor inicializado en el puerto ${port}`)
})