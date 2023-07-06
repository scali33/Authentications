const model = new require("../../models/usuario")
const auth = require("../auth")
const verificarEmailExistente = require("../verifyemail")
var rota = 'email'
module.exports = (app)=>{
    app.put(`/atualizar/${rota}`, auth.validarToken, async (req, res) => {
        try {
          const id = req.usuarioAtual.id;
          const { email } = req.body;
          const dados = { email };
    
          const emailExiste = await verificarEmailExistente(email);
    
          if (emailExiste) {
            return res.json({Message: 'Email não é válido ou já existe'}).status(200);
          }
    
          const respBd = await model.update(dados, { where: { id: id } });
          res.json(respBd);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
      });
    };