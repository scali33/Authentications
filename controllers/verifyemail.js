const model = require("../models/usuario");

async function verificarEmailExistente(email) {
  const usuario = await model.findOne({ where: { email: email } });
  return usuario !== null? true:false;
}

module.exports = verificarEmailExistente;