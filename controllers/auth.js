const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//segredo para encrypitação do token
const jwScret = 'clkasdfcklasdlkasdlkcnjiotlĩj'
const model = new require('../models/usuario')

module.exports={
    criptografarSenha: async(senha)=>{
        const salt = bcrypt.genSaltSync(12)
        return bcrypt.hashSync(senha, salt)
    },
    gerarToken: async(usuario)=> await jwt.sign(usuario, jwScret,{expiresIn:'1h'}),
    
    validarSenha: async(senha,hashSenha)=> await bcrypt.compare(senha,hashSenha),

    validarToken:(req,res,next)=>{
        try{
            let token = req.headers.authorization
            token = token.split(' ')
            token = token[1]
            jwt.verify(token, jwScret,(erro,dados)=>{
                if(erro){
                    res.json({message:'Token inválido!',error:erro}).status(400)
                } else{
                    req.token = token
                    req.usuarioAtual = {...dados}
                    next()
                }
            })
        
        } catch(erro){
            res.json({message:"Não existe token na requisição."}).status(400)
        }
    }
} 
