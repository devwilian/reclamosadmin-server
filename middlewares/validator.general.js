const TipoDocumento = require('../model/tipodocumento.model');
const Solicitante = require('../model/solicitante.model');

const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos= (req, res = response, next)=>{
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errores: errores.mapped()
        })
    }
    next();
}
const validarTipodDocumento = async (req, res = response, next)=>{
    const errores = validationResult(req);
    const { tipodocumento } = req.body;
    const tipoDocBD = await TipoDocumento.findById(tipodocumento);
    if(tipoDocBD){
        next();
    }else{
        return res.status(400).json({
            ok:false,
            msg: 'No existe tipo de documento en la base de datos'
        })
    }
}
const validarIdSolicitante = async (req, res = response, next)=>{
    const { solicitante } = req.body;
    const solicitantebd = await Solicitante.findById(solicitante);
    console.log(solicitantebd);
    if(solicitantebd){
        next();
    }else{
        return res.status(400).json({
            ok:false,
            msg: 'No existe Solicitante en la base de datos'
        })
    }
}

module.exports = {
    validarCampos,
    validarTipodDocumento,
    validarIdSolicitante
}