const model = new require('../../models/usuario')
const validacao = require('../validacao')
const auth = require('../auth')
const rota = 'usuarios'
module.exports = (app)=>{
    app.post(`/cadastrar/${rota}`, async (req, res)=>{
        try {
         let dados = req.body
             let dadosLogin = await validacao.validarCadastro(dados, model)
             if (dadosLogin.validacao){
                 dados.senha = await auth.criptografarSenha(dados.senha)
                 let respBd = await model.create(dados)
                 delete respBd.dataValues.senha
                 res.json(respBd).status(201)
             } else {
                 res.json(dadosLogin).status(200)
             }
        } catch (error) {
         res.json(error).status(401)
        }
     })
    
    app.get(`/consultar/${rota}/:id`,auth.validarToken, async (req, res)=>{
        let dados =  await model.findOne({where:{id:req.usuarioAtual.id}})  
        res.json(dados)
    })
    app.put(`/atualizar/${rota}`,auth.validarToken, async (req, res) => {
        let id = req.usuarioAtual.id
        console.log(id)
        let {nome,cpf,telefone,whatsapp} = req.body
        let dados = {nome,cpf,telefone,whatsapp}
        let respBd = await model.update(dados, {where:{id:id}})
        res.json(respBd)
    })
    app.delete(`/excluir/${rota}`,auth.validarToken, async (req, res) => {
        let id = req.usuarioAtual.id
        let respBd = await model.destroy({where:{id:id}})
        res.json(respBd)
    })
}