const {Schema, model} = require('mongoose')

const HistorySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    institucion: { type: String, required: true, trim: true },
    matricula: { type: String, required: true, trim: true },
    imagePath: { type: String, required:true },
    created_ad:{type:Date, default:Date.now},
    userId:{type:Schema.Types.ObjectId,ref:'Users'}
  },
  {
    timestamps: true,
  }
);

module.exports = model("History", HistorySchema);