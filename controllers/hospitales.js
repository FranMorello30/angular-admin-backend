const { response } = require('express');

const Hospital = require('../models/hospital')

const getHospitales = async(req,res = response) =>{
    
    const hospitales = await Hospital.find()
            .populate('usuario','nombre')
            
    
    res.status(200).json({
        hospitales
    })
}
const crearHospital = async (req,res = response) =>
{
    const uid = req.uid;

    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    })
    

    try {
        const HospitalDB = await hospital.save();

        res.status(200).json({
           hospital:HospitalDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Hable con el administrador"
        })

    }

    
}
const actualizarHospital = (req,res = response) =>{
    res.status(200).json({
        msg:"actualizarHospital"
    })
}
const borrarHospital = (req,res = response) =>{
    res.status(200).json({
        msg:"borrarHospital"
    })
}

module.exports = {
    getHospitales,
    borrarHospital,
    actualizarHospital,
    crearHospital
}