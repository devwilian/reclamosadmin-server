/**
 * path: /api/login
 */

const { Router } = require("express");
const { postLogin, postLoginGoogle } = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validator.general");
const { check } = require('express-validator');

const router = Router();

router.post(
    '/',
    [
        check('email','Email es obligatorio!').isEmail(),
        check('password','Password es obligatorio!').not().isEmpty(),
        validarCampos
    ],
    postLogin
);
router.post(
    '/google',
    [
        check('token','El token es obligatorio!').not().isEmpty(),
        validarCampos
    ],
    postLoginGoogle
);

module.exports = router