const Notifi = require ('../models/notifications')
const User = require('../models/User')
ctrlNotifi = {}


ctrlNotifi.postNotifi = async (req,res)=>{
    const userId = req.user._id
    const addressee = req.params.idNotification
    const namePost = req.user.nombreyape
    const {type} = req.body

    const userAddressee = await User.find({_id : addressee})
    const nameAddressee = userAddressee[0].nombreyape

    let titulo = ""
    let descripcion = ""
    switch (type){
        case "Contacto":
            titulo = "Contacto"
            descripcion = `${namePost} te mando una solicitud de contacto`
            break
    }
    const newNotification = new Notifi({
        titulo, descripcion, type, namePost, nameAddressee, userId, addressee
    })

    const notifications = await newNotification.save()

    return res.json({
        message:"Notificacion enviada y guardada",
        notifications
    })
}

ctrlNotifi.getNotifiMailBox = async (req,res)=>{
    const userId = req.user._id
    const notifications = await Notifi.find({ $and: [{ addressee: userId }, { state: "Pendiente" }] })
    
    return res.json({
        message:"Notificaciones enviadas con exito",
        notifications
    })
}

ctrlNotifi.postAcceptNotification = async (req,res)=>{
    const id = req.params.idNotification
    const {type} = req.body
    console.log(type)
    let notifications = ""
    if (type == "accept"){
        notifications = await Notifi.findByIdAndUpdate(id,{state:"Accepted"})
    }else{
    notifications = await Notifi.findByIdAndUpdate(id,{state:"cancelled"})
    }
    return res.json({
        message:"Notificacion actualizada",
        notifications
    })
}

module.exports = ctrlNotifi;