
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const validarJWT = async (req,res,next)=>{

    //LLEGA EL TOKEN DEL HEADER Y SE ALMACENA EN LA VAR
    let token = req.headers.authorization;

    //Se verifica si el token existe en la peticion

    if(!token){
        return res.json({
            msg:"Error de autenticacion - No hay token en la peticion"
        })
    };


    try {
        //CON ESTA LINEA VERIFICAMOS SI EL TOKEN ES VALIDO, EL VERIFY RECIBE EL TOKEN Y EL SECRET
        const {uid} = await jwt.verify(token, process.env.SECRET)

        //SE BUSCA EL USUARIO EN LA BASE DE DATOS PARA VER SI ESTA INICIADO CON ESE TOKEN

        const usuario = await User.findById(uid)

        if(!usuario){
            return res.json({
                error:"NO HAY USUARIO INICIADO CON ESE TOKEN"
            })
        }

        //verificar si usuario esta activo o no activo por el delete

        if(!usuario.isActive){
            return res.json({
                msg:"TOKEN NO VALIDO, EL USUARIO NO ESTA ACTIVO EN NUESTRO SISTEMA"
            })
        }

        //SI SE VERIFICA TODO ESTO, SE GUARDA LA INFORMACION DEL USUARIO AL REQUEST PARA SER UTILIZADO EN DISTINTAS PARTES DEL CODIGO
        req.user = usuario;

        //se continua con la ejecucion
        next()
    } catch (error) {
        console.log(error)
        res.json({
            msg:"ERROR DE AUTENTICACION, TOKEN NO VALIDO"
        })
    }
}

module.exports=validarJWT