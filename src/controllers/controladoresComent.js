const Coment = require("../models/modeloComentario")

const ctrlComent = {}

ctrlComent.getComent= async(req,res)=>{
    try {
        const coment2=await Coment.find({isActive : true})
        return res.json({
            coment2
    
        })
    }catch(err){
        return res.json({
            message: "Error al mostrar los comentarios"
        })
    }

}

ctrlComent.postComent= async(req,res)=>{
        try {
            const idUser = req.user._id
            const userName = req.user.nombreyape
            const role = req.user.role
            const {comentario}=req.body
    
            if (!idUser || !comentario){
                return res.status(400).json({
                    message: "Error al cargar el comentario"
                })
            }
            console.log(userName)
            const newComent = new Coment({
            idUser,userName,comentario, role
        })
    
        const coment2 = await newComent.save()
    
        return res.json({
            message:"El comentario se a subido exitosamente",
            coment2
    
        })
    
        }catch (error){
            return res.json({
                        message: "Error al subir la tarea"
        })
    
        }
    
}

module.exports = ctrlComent