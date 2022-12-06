const bcrypt = require('bcrypt')
const User = require("../models/User")
const {findUsuario,findMatricula,findCodigoAdmin} = require('../helpers/buscarUsuarios')

const ctrlProfile = {}

ctrlProfile.getProfile = async (req, res) =>{
    try{
        const idUser = req.params.idProfile
        const user=await User.findOne({$and:[{_id: idUser},{isActive:true}]})
        if (!user){
            res.json({
                message: "Usuario no Activo o no existe"
            })
        }

        var profileUser = {
            userName : user.nombreyape,
            dni: user.dni,
            email: user.email,
            role: user.role,
            cuenta: false,
            userRole: req.user.role
        }

        console.log(`${JSON.stringify(req.user._id)}  == ${JSON.stringify(user._id)}`)
        if(JSON.stringify(req.user._id) == JSON.stringify(user._id)){
            profileUser.cuenta = true
        }else{
            profileUser = {...profileUser, dni:""
            }
        }
        return res.json({
            message: "Usuario encontrado",
            profileUser
        })
    }catch(error){
        console.log(error)
        return res.json({
            message: "Error al buscar usuarios"
        })
    }
}

ctrlProfile.getIdToken = async (req, res) =>{
    const userId = req.user._id
    return res.json({userId})
}

ctrlProfile.getVerCuenta = async (req, res) =>{
    try{
    const idUser = req.params.idCuenta
    const roleU = req.user.role
    const user=await User.findOne({$and:[{_id: idUser},{isActive:true}]})
    if (!user){
        res.json({
            message: "Usuario no Activo o no existe"
        })
    }
    let cuenta = false

    console.log(`${JSON.stringify(req.user._id)}  == ${JSON.stringify(user._id)}`)
    if(JSON.stringify(req.user._id) == JSON.stringify(user._id)){
        cuenta = true
    }
    return res.json({
        message: "Usuario encontrado",
        cuenta,
        roleU
    })
    }catch(error){
        console.log(error)
        return res.json({
            message: "Error al buscar usuarios"
        })
    }
}

module.exports = ctrlProfile