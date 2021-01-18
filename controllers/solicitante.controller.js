const Solicitante = require('../model/solicitante.model');
const { response } = require('express');
const  bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getSolicitantes = async ( req , res = response )=>{
    try {
        const solicitante = await Solicitante.find().populate('tipodocumento');
                                             
        res.json({
            ok:true,
            solicitante
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
const postSolicitante = async (req,res = response)=>{
    console.log(req.body);
    try {
        const solicitante = new Solicitante(req.body);
        solicitante.save();
        res.json({
            ok:true,
            solicitante
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
module.exports = {
    getSolicitantes,
    postSolicitante
}