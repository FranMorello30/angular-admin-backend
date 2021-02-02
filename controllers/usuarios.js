const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generatJWT } = require('../helpers/jwt')

const getUsuarios = async (req,res) => 
{
    const desde = Number(req.query.desde) || 0;
//console.log(desde)
// para hacer paginacion tmabien existen paquetes en mongoose ejemplo (npm install mongoose-paginate) o ngx-pagination desde angular
    /*const usuario = await Usuario
                        .find({},'nombre email role google')
                        .skip( desde )
                        .limit( 5 )


//    const total = await Usuario.count()
    const total = await Usuario.countDocuments()*/

    const [usuarios,total] = await  Promise.all([
        Usuario
        .find({},'nombre email role google img')
        .skip( desde )
        .limit( 5 ),

        Usuario.countDocuments()
    ])

    res.json({
        ok:true,
        usuarios,
       // uid:req.uid,
        total
    })
}
const crearUsuarios = async (req,res = response) => 
{
    
    const {email,password,nombre} = req.body

    

    try {
        const existeEmail = await Usuario.findOne({ email })

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Email ya esta registrado'
            })
        }

        const usuario =  new Usuario(req.body)

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt)

        //guardar usuario
        await usuario.save();

         //generar token = JWT
         const token = await generatJWT(usuario.id)

        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado... revisar logs'
        })
    }


    
}
const actualizarUsuario = async (req,res = response) =>
{
    
    const uid = req.params.id;
    const {password,gooogle,email, ...campos} = req.body;
//validaciones para verificar que el uid es valido 
//--------------------------------------------------
/*if(uid.match(/^[0-9a-fA-F]{24}$/)){
    //id valida
    }
    else{
    //id invalida
    }*/
//---------------------------------------------------
   // if (mongoose.Types.ObjectId.isValid(uid))
// ---------------------------------------------------       
    /*const mongoose = require('mongoose');
    const {Types: {ObjectId}} = mongoose;
    const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;*/
//----------------------------------------------------------------------
    try {
        const usuarioDB = await Usuario.findById( uid );
        console.log(usuarioDB)
        if(!usuarioDB)
        {
            return res.status(404).json({
                ok:false,
                msf:'usuario no existe'
            })
        }
        // actualizaciones
        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.exists({ email });
            
            if ( existeEmail ) {
                return res.status(400).json({
                        ok: false,
                        msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        /*if(usuarioDB.email === email){
         delete campos.email
       }*/
       campos.email = email;
        //delete campos.password;
      //  delete campos.google;

        const usuarioAct = await Usuario.findByIdAndUpdate(uid,campos, {new : true});
        return res.status(200).json({
            ok:true,
            usuarioAct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado... revisar logs'
        })
    }
}
const borrarUsuario = async (req,res = response) =>
{
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB)
        {
            return res.status(404).json({
                ok:false,
                msf:'usuario no existe'
            })
        }
        await Usuario.findByIdAndDelete(uid)
        res.status(200).json({      
            msg:'usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({      
            msg:'error al intentar borrar contacte con el administrador'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}