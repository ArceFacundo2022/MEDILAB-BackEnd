const {model, Schema} =  require('mongoose');
require('../models/User')
const TaskSchema =  new Schema ({
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDone:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    }
    

},
{
    versionKey:false,
    timestamps:true
})


module.exports = model('Tasks', TaskSchema)