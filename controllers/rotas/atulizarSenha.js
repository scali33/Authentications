const model = new require("../../models/usuario")
const auth = require("../auth")
const verificarEmailExistente = require("../verifyemail")
module.exports = (app)=>{
    app.put(`/atualizar/senha`, auth.validarToken, async (req, res) => {
        try {
            const id = req.usuarioAtual.id;
            const {email,senha,senhanova,comfirmacao } = req.body;
            const dados = { email,senha,senhanova,comfirmacao };



            if (emailExiste) {
                return res.json({Message: 'Email não é válido ou já existe'}).status(200);
              }
        
        } catch{
            
        }
    })
}