const {Router} = require('express')
const jwt = require('jsonwebtoken');

const router = Router()

const Notifi = require ('../models/notifications')
const History = require('../models/History')
const User = require('../models/User');
const validarJWT = require("../middlewares/validar-jwt")

const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/:id' , async (req, res)=> {
    const historys = await History.find({userId:req.params.id})
    res.json(historys)
})
// router.get('/' , async (req, res)=> {
//     const historys = await History.find()
//     res.json(historys)
// })

router.post('/:id', upload.single('image'), async (req, res)=> {
  try{

    const addressee = req.params.id
    const type = "History"
    const {title, institucion, matricula, token} = req.body
    imagePath = `uploads\\${req.file.originalname}`

    const {uid} = await jwt.verify(token, process.env.SECRET)

    //SE BUSCA EL USUARIO EN LA BASE DE DATOS PARA VER SI ESTA INICIADO CON ESE TOKEN

    const usuario = await User.findById(uid)

    const userId = usuario._id 
    const namePost = usuario.nombreyape

    const newHistory = new History({title, institucion, matricula, imagePath, userId:req.params.id})

    await newHistory.save()
    titulo = "Historia Clinica"
    descripcion = `${namePost} Subio ${title} a tus historias`

    const newNotification = new Notifi({
      titulo, descripcion, type, addressee, userId, namePost, imagePath
  })

  const notifications = await newNotification.save()

    res.json({msg:'Historia Guardada',history:newHistory})
  }
  catch (error) {
    console.log(error)
      return res.status(400).json({
          message : "Error al autenticar"
      })
  }
})


router.delete('/:id' , async (req, res)=> {
    const history = await History.findByIdAndDelete(req.params.id)
    res.json({msg:'Eliminado',historyDelete:history})

})

module.exports = router