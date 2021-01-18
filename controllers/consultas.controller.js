const { response } = require('express');
const Usuario = require('../model/usuario.model');
const Solicitante = require('../model/solicitante.model');

const getConsultaGeneral = async (req, res = response)=>{
    try {
        const query = req.params.query;
        console.log(query);
        const exreg = RegExp(query,'i');

        const [usuarios,solicitantes] = await Promise.all(
            Usuario.find({nombres : exreg}),
            Solicitante.find({nombres : exreg})
        )

        res.json({
            ok: true,
            usuarios,
            solicitantes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
module.exports = {
    getConsultaGeneral
}