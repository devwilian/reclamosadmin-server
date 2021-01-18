const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator.general');

const { validarJWT } = require("../middlewares/validator.jwt");
const { getTipoDocumentos, postTipoDocumento, putTipoDocumento, deleteTipoDocumento } = require("../controllers/tipodocumento.controller");

const router  = Router();

router.get('/', getTipoDocumentos);
router.post(
    '/', 
    // validarJWT,
    [
        check('descripciondocumento','El tipo de documento es obligatorio!').not().isEmpty(),
        validarCampos,
    ],
    postTipoDocumento
);
    
router.put(
        '/:id',
        validarJWT,
        [
        check('tipodocumento','El tipo de documento es obligatorio!').not().isEmpty(),
        validarCampos
    ],
    putTipoDocumento
);
router.delete('/:id', validarJWT, deleteTipoDocumento);

module.exports = router;