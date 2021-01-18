const { Router } = require('express');
const { check } = require('express-validator');
const { postSolicitante, getSolicitantes } = require('../controllers/solicitante.controller');
const { validarCampos, validarTipodDocumento } = require('../middlewares/validator.general');
const { validarJWT } = require('../middlewares/validator.jwt');

const router = Router();
router.get('/',
    // validarJWT, 
    getSolicitantes
);
router.post(
    '/',
    [
        check('tipodocumento','Tipo de documento no esta en la base de datos').isMongoId(),
        validarTipodDocumento,
        check('nrodocumento','El numero de documento es obligatorio').not().isEmpty(),
        check('apellidos','El apellido es obligatorio').not().isEmpty(),
        check('nombres','El nombre es obligatorio es obligatorio').not().isEmpty(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('direccion','La direccion es obligatoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    postSolicitante
);


module.exports = router;