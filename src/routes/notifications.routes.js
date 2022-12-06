const router = require("express").Router()
const{

postNotifi,
getNotifiMailBox,
postAcceptNotification

}=require('../controllers/notifications.controllers')
// const esAdmin = require("../middlewares/admin")
const validarJWT = require("../middlewares/validar-jwt")


router.post("/Notifications/:idNotification",[validarJWT],postNotifi)
router.post("/NotificationsA/:idNotification",[validarJWT],postAcceptNotification)
router.get("/Notifications",[validarJWT],getNotifiMailBox)


module.exports=router