const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator.general');

const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require("../controllers/usuario.controller");
const { validarJWT } = require("../middlewares/validator.jwt");

const router  = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
    '/', 
    validarJWT,
    [
        check('apellidos','Los apellidos son obligatorios!').not().isEmpty(),
        check('nombres','Los nombres son obligatorios!').not().isEmpty(),
        check('password','La contraseña es obligatorio!').not().isEmpty(),
        check('email','El correo es obligatorio!').isEmail(),
        validarCampos,
    ],
    postUsuario
);

router.put(
    '/:id',
    validarJWT,
    [
        check('apellidos','Los apellidos son obligatorios!').not().isEmpty(),
        check('nombres','Los nombres son obligatorios!').not().isEmpty(),
        check('role','El role es obligatorio!').not().isEmpty(),
        validarCampos
    ],
    putUsuario
);
router.delete('/:id', validarJWT.apply, deleteUsuario);

module.exports = router;