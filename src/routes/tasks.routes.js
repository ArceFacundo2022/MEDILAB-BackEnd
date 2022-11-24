const router = require('express').Router()

const {getTasks,postTasks,putTasks,deleteTask,getTasksForUserId, putStatusTasks} = require('../controllers/tasks.controllers')
const validarJWT = require('../middlewares/validar-jwt')

router.get("/tareas",getTasks)
router.post("/tareas",[validarJWT],postTasks)
router.put("/tareas/:id",[validarJWT],putTasks)
router.delete("/tareas/:id",[validarJWT],deleteTask)
router.get("/tareas/tareasFiltradas",[validarJWT],getTasksForUserId)
router.put("/tareas/completarTarea/:id",[validarJWT],putStatusTasks)



module.exports = router