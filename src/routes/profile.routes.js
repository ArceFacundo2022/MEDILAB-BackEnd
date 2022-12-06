const router = require("express").Router()
const{

getProfile,
getIdToken,
getVerCuenta

}=require('../controllers/profile.controllers')
// const esAdmin = require("../middlewares/admin")
const validarJWT = require("../middlewares/validar-jwt")


router.get("/profile/:idProfile",[validarJWT],getProfile)
router.get("/token",[validarJWT],getIdToken)
router.get("/cuenta/:idCuenta",[validarJWT],getVerCuenta)


module.exports=router