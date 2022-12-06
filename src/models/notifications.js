const {model, Schema} =  require('mongoose');
require('./User')
const TaskSchema =  new Schema ({
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    state:{
        type:String,
        default:"Pendiente"
    },
    namePost: {
        type:String
    },
    nameAddressee: {
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    addressee:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    imagePath:{
        type: String,
        required:true
    },

},
{
    versionKey:false,
    timestamps:true
})


module.exports = model('notifications', TaskSchema)