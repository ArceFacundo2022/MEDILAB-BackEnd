const User = require("../models/User");

const buscar = {};

(buscar.findUsuario = async (dni, email, res) => {
  const datos = await User.findOne({ $or: [{ dni: dni }, { email: email }] }); //busca si existe un usuario con el mismo dni o email
  if (datos) {
    return res.json({
      message: "Usuario existe con esos datos",
    });
  } 
}),
  (buscar.findMatricula = async (matricula, res) => {
    const datos = await User.findOne({ enrollment: matricula }); //busca si existe un usuario con la misma matricula
    if (datos) {
      return res.json({
        message: "Existe un usuario con esa Matricula",
      });
    } else {
      return res.json({ message: "correcto matricula" });
    }
  }),
  (buscar.findCodigoAdmin = async (codigoAdmin, res) => {
    const datos = await User.findOne({ codeAdmin: codigoAdmin }); //busca si existe un usuario con el mismo codigo de admin
    if (datos) {
      return res.status(404).json({
        message: "Existe un usuario con ese codigo",
      });
    } else {
      return res.json({ message: "correcto codAdmin!" });
    }
  });

module.exports = buscar;
