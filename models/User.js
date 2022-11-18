const {model, Schema} =  require('mongoose')

const UserSchema = new Schema ({
    dni:{
        type:String,
        required:true,
        unique:true
    },
    nombreyape:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    enrollment:{
        type:String
    },
    codeAdmin:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    versionKey:false,
    timestamps:true
})


module.exports = model('Users', UserSchema);