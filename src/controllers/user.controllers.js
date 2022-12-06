const bcrypt = require('bcrypt')
const User = require("../models/User")
const {findUsuario,findMatricula,findCodigoAdmin} = require('../helpers/buscarUsuarios')

const ctrlUser = {}


//Controladores del usuario

//Obtener los usuarios de la BD

ctrlUser.getUser = async (req, res) => {

    const users = await User.find()

    return res.json(users)
}

ctrlUser.getUserForDNI = async (req, res) => {

    const dni = req.params.dni

    const users = await User.findOne({dni:dni})

    return res.json(users)
}

//Controlador para crear un nuevo usuario (POST)

ctrlUser.postUser = async (req, res) => {


    try {
        const {
            dni,
            nombreyape,
            email,
            password,
            role,
            enrollment,
            codeAdmin
        } = req.body

        console.log([dni, nombreyape, email, password])

        if (!dni|| !nombreyape || !email || !password || !role) {
            console.log("No se puede registrar, faltan campos por completar")
            return
        }

        const passwordCrypt = bcrypt.hashSync(password, 10) //Encriptar
        if (role === "user") {//genera usuario si es un paciente

            findUsuario(dni,email,res)

            const newUser = new User({
                dni,
                nombreyape,
                email,
                password: passwordCrypt,
                role
            })

            
            const username = await newUser.save()

            return res.json({
                message: "Usuario creado correctamente, sus datos son:",
                username
            })
        } else if (role === "medic") {//genera usuario si es un medico
            
            await findUsuario(dni,email,res)
            await findMatricula(enrollment,res)

            const newMedic = new User({
                dni,
                nombreyape,
                email,
                password: passwordCrypt,
                role,
                enrollment
            })

            const userMedic = await newMedic.save()

            return res.json({
                message: "Usuario creado correctamente, sus datos son:",
                userMedic
            })
        } else if (role === "admin") {//genera usuario si es un admin

            findUsuario(dni,email,res)
            //findCodigoAdmin(codeAdmin,res)

            const newAdmin = new User({
                dni,
                nombreyape,
                email,
                password: passwordCrypt,
                role,
                codeAdmin
            })
            if(!codeAdmin) return console.log("no hay codigo de administrador ")
            const userAdmin = await newAdmin.save()

            return res.json({
                message: "Usuario creado correctamente, sus datos son:",
                userAdmin
            })
        }
    } catch (error) {
        console.log(error)
    }


}

//Controlador para actualizar datos del USER, se requiere id en postman

ctrlUser.putUser = async (req, res) => {

    const id = req.params.id

    const {
        user,
        email
    } = req.body


    try {
        const userUpdate = await User.findByIdAndUpdate(id, {
            user,
            email
        }, {
            new: true
        });

        return res.json({
            msg: 'Usuario actualizado correctamente',
            userUpdate
        })
    } catch (error) {
        return res.json({
            msg: 'Error al actualizar usuario'
        })
    }
};

//controlador para eliminar usuario
ctrlUser.deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const userDelete = await User.findByIdAndUpdate(id, {
            isActive: false
        }, {
            new: true
        })


        return res.json({
            message: `El usuario ha sido eliminado`,
            userDelete: userDelete.user
        })


    } catch (error) {
        console.log(error)
    }

}


module.exports = ctrlUser