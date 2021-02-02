const path = require('path')
const fs = require('fs');

const {response} = require('express')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/act-img');

const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo
    const id = req.params.id

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            msg:'No es un medico , usuario o hospital (tipo)'
        })
    }
//validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg:'No hay ningun archivo.'
        });
      }
//procesar img
    const  file = req.files.imagen;

    //extraer nombre del archivo
    const nombre = file.name.split('.')
    //extension del archivo es la ultima posicion
    const extension = nombre[nombre.length - 1]

    //validar extension
    const extensionesValida = ['png','jpg','jpeg','gif']
    if(!extensionesValida.includes(extension)){
        return res.status(400).json({
            msg:'No es una extension valida (png,jpg,jpeg,gif)'
        })
    }
    //generar nombre del archivo (uuidv4) genera id aleatorios para evitar nombres repetidos
    const nombreArchivo = `${ uuidv4() }.${extension}`

    //crear path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //mover imagen u archivo
    file.mv(path, (err) => {

        if (err){
            console.log(err)
            return res.status(500).json({
                msg:'Error al mover la imagen'
            });
        }
          

        //actualizar base de datos
        actualizarImagen(tipo,id,path,nombreArchivo)

    
        res.status(200).json({
            msg:'imagen subida existosamente',
            nombreArchivo
        });
      });

    /*res.status(200).json({
        msg:'fileUpload'
    })*/
}
const retornaImagen = (req, res = response) =>
{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    pathImg = ''
    pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`)

    // imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        pathImg = path.join( __dirname, `../uploads/no-image.jpg`)
        res.sendFile(pathImg)
    }

    
}


module.exports = {
    fileUpload,
    retornaImagen
}