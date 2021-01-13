/**
 * path: /api/login
 */

const { Router } = require("express");
const { postLogin } = require("../controllers/auth.controller");
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

module.exports = router