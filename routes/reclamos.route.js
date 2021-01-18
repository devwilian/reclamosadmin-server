const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarIdSolicitante } = require('../middlewares/validator.general');
const { getReclamos, postReclamos } = require('../controllers/reclamos.controller');

const router = Router();

router.get('/',getReclamos);
router.post(
    '/',
    [
        check('solicitante','Id solicitante no esta en la base de datos').isMongoId(),
        validarIdSolicitante,
        check('biencontratado','Tiene que especificar si contrato un servicio o un producto').not().isEmpty(),
        check('tiporeclamo','Tiene que especificar si es un reclamo o una queja').not().isEmpty(),
        check('motivoreclamo','El motivo de su reclamos es obligatorio').not().isEmpty(),
        check('detallereclamo','Los detalles de su reclamo son obligatorios').not().isEmpty(),
        check('pedido','El pedido es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    postReclamos
);

module.exports = router;