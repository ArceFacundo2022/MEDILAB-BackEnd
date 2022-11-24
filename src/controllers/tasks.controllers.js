const Tasks = require ('../models/Tasks')
ctrlTask = {}

ctrlTask.getTasks = async (req,res)=>{
    const tasks = await Tasks.find({isActive:true})
    
    return res.json({
        message:"Tareas de todos los usuarios",
        tasks
    })
}

ctrlTask.getTasksForUserId = async (req,res)=>{
    const userId = req.user._id //toma el id del usuario ingresado
    
    const filterTasks = await Tasks.find({userId})
    .populate('userId', ['user','email'])

    return res.json({
        message:`Tareas del usuario ${req.user.user}`,
        filterTasks
    })
}

ctrlTask.postTasks = async (req,res)=>{
 try {
    const {titulo,descripcion} = req.body
    console.log(req.user)
    const newTask = new Tasks({
        titulo,descripcion, userId:req.user._id
    })

    const task = await newTask.save()
    
    return res.json({
        message:"Tarea guardada",
        task
    })
 } catch (error) {
    console.log(error)
 }
}

ctrlTask.putTasks = async (req,res)=>{
    const id = req.params.id
    const user = req.user

    const tarea = await Tasks.findById(id)

    const {titulo, descripcion} = req.body
    
    console.log(JSON.stringify(tarea.userId))
    console.log(JSON.stringify(user._id))

    try {
        if(JSON.stringify(tarea.userId) == JSON.stringify(user._id)){

            const tareaUpdate = await Tasks.findByIdAndUpdate(id,{titulo,descripcion},{new:true})

            return res.json({
                message:"Tarea actualizada",
                tareaUpdate
            })
            
        }
        return res.json({
            message:"No puede actualizar una tarea que no es suya"
        })

        


    } catch (error) {
        console.log("No se pudo actualizar")
        console.log(error)
    }
}

ctrlTask.putStatusTasks=async(req,res)=>{
    const id = req.params.id
    const user = req.user

    const tarea = await Tasks.findById(id)

    console.log(tarea.userId)
    console.log(JSON.stringify(user._id))

    try {
        if(JSON.stringify(tarea.userId) == JSON.stringify(user._id)){

            const tareaUpdate = await Tasks.findByIdAndUpdate(id,{isDone:true},{new:true})

            return res.json({
                message:"Estado de la tarea actualizado",
                tareaUpdate
            })
            
        }
        return res.json({
            message:"No puede actualizar el estado de una tarea que no le pertenece"
        })


    } catch (error) {
        console.log("No se pudo actualizar")
        console.log(error)
    }
}

ctrlTask.deleteTask = async (req,res)=>{
    const id = req.params.id
    const user = req.user

    const tarea = await Tasks.findById(id)

    console.log(JSON.stringify(tarea.userId))
    console.log(JSON.stringify(user._id))

    try {
        if(JSON.stringify(tarea.userId) == JSON.stringify(user._id)){

            const tareaDelete = await Tasks.deleteOne({id})

            return res.json({
                message:"Tarea eliminada con exito",
            })
            
        }
        return res.json({
            message:"No puede eliminar una tarea que no es suya"
        })

        


    } catch (error) {
        console.log("No se pudo actualizar")
        console.log(error)
    }
}


module.exports = ctrlTask;