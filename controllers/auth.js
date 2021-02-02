const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generatJWT } = require('../helpers/jwt')

const login = async (req,res = response) =>
{
    const {email,password} = req.body
    try {
        // verificar email
        const usuarioDB = await Usuario.findOne( {email} );
        if(!usuarioDB)
        {
            return res.status(400).json({
                ok:false,
                msf:'contraseña o email no validos'
            })
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword)
        {
            return res.status(400).json({
                ok:false,
                msf:'contraseña o email no validos'
            })
        }

        //generar token = JWT
        const token = await generatJWT(usuarioDB.id)

        res.status(200).json({      
            token
        })
    } catch (error) {
        res.status(500).json({      
            msg:'error al intentar acceder contacte con el administrador'
        })
    }
}
module.exports = {
    login
}