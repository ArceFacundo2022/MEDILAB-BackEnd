const {Schema,model}=require('mongoose')



const ComentSchemas = new Schema ({

comentario:{type:
    String},

isActive: {
    type: Boolean,
    default : true
},
role:{
    type:
    String
},
idUser:{
    type:
    Schema.ObjectId,
    ref: "nombreyape",
    required: true
},
userName:{
    type : String
}


},{
    versionKey:false,
    timestamps:true
})

module.exports =model("comentarios",ComentSchemas)