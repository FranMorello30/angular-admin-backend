/*
    ruta /api/medicos

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')


const { validarJWT }  = require('../middlewares/validar-jwt')

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();

router.get('/',getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre','el nombre del medico es necesario').not().isEmpty(),
        check('hospital','el hospital al que el medico pertenece es necesario').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', actualizarMedico);

router.delete('/:id',borrarMedico);

module.exports = router;