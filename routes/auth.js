/*
path : /api/login
*/
const { Router } = require('express');
const { login } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.post('/',
        [
            check('email','el correo es obligatorio').isEmail(),
            check('password','la contraseña es obligatoria').not().isEmpty(),
            validarCampos
        ],login
)

module.exports = router;