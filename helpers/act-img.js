const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs')

const borrarImagen = (path) =>{
    //
    if(fs.existsSync(path)){
        // borrar imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async (tipo,id,path,nombreArchivo) =>
{ 
    let pathViejo = "";
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if(!medico)
                return false
                
                pathViejo  = `./uploads/medicos/${medico.img}` 
            borrarImagen(pathViejo);
            
             medico.img = nombreArchivo;
             await medico.save();
             return true;
        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if(!hospital)
                return false
                
             pathViejo  = `./uploads/hospitales/${hospital.img}` 
            borrarImagen(pathViejo);
            
            hospital.img = nombreArchivo;
             await hospital.save();
             return true;
        break;
        case 'usuarios':
            const usuarios = await Usuario.findById(id)
            if(!usuarios)
                return false
                
                 pathViejo  = `./uploads/usuarios/${usuarios.img}` 
            borrarImagen(pathViejo);
            
            usuarios.img = nombreArchivo;
             await usuarios.save();
             return true;
        break;
        default:
        break;
    }
}

module.exports ={
    actualizarImagen
}