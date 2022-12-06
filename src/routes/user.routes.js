const router =  require('express').Router()

const {getUser,postUser,putUser,deleteUser, getUserForDNI} = require('../controllers/user.controllers')
router.post('/user',postUser) //crear un nuevo usuario 
router.get('/user',getUser) //obtener la lista de usuarios
router.put('/user/:id',putUser)//actualizar usuario (solo puede actualizar con su usuario iniciado)
router.delete('/user/:id',deleteUser)//actualizar is active del usuario a false(solo con token activo)
router.get('/userDNI/:dni', getUserForDNI)

module.exports = router