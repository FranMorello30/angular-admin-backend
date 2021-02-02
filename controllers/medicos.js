const { response } = require('express');

const Medico = require('../models/medico')

const getMedicos = async (req,res = response) =>{

    const Medicos = await Medico.find()
        .populate('usuario','nombre')
        .populate('hospital','nombre')

    res.status(200).json({
        Medicos
    })
}
const crearMedico = async (req,res = response) =>
{
    //const p = req.body
    const uid = req.uid;

    const medico = new Medico({
        usuario:uid,
        ...req.body
    });

    try {

        const medicoBD = await medico.save()
        res.status(200).json({
            medico : medicoBD
            
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Hable con el administrador"
        });
    }

    /*res.status(200).json({
        msg:"crearMedico",
        p
    })*/
    
}
const actualizarMedico = (req,res = response) =>{
    res.status(200).json({
        msg:"actualizarMedico"
    })
}
const borrarMedico = (req,res = response) =>{
    res.status(200).json({
        msg:"borrarMedico"
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}