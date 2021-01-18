const Reclamos = require('../model/reclamo.model');
const { response } = require('express');

const getReclamos = async ( req , res = response )=>{
    const pag = Number(req.query.pag) || 0;
    try {
        const [ reclamos, total ] = await Promise.all([
            Reclamos.find().populate('solicitante').skip(pag).limit(5),
            Reclamos.countDocuments()
        ]);
        res.json({
            ok:true,
            total,
            pag,
            reclamos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
const postReclamos = async (req,res = response)=>{
    try {
        const reclamo = new Reclamos(req.body);
        reclamo.save();
        res.json({
            ok:true,
            reclamo
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
module.exports = {
    getReclamos,
    postReclamos
}