const TipoDocumento = require('../model/tipodocumento.model');
const { response } = require('express');
const  bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getTipoDocumentos = async (req,res)=>{
    const tipoDocumentos = await TipoDocumento.find();
    console.log('Get Tipo de Documentos');
    res.json({
        ok:true,
        uid:req.uid,
        tipoDocumentos
    });
}
const postTipoDocumento = async (req,res = response)=>{
    const { descripciondocumento } = req.body;
    try {
        const existeTipoDocumento = await TipoDocumento.findOne({ descripciondocumento });
        console.log('Flag 1', existeTipoDocumento);
        if(existeTipoDocumento){
            console.log('Flag 2', existeTipoDocumento);
            
            return res.status(401).json({
                ok: false,
                msg:"El tipo de documento ya existe!"
            });
        }
        console.log('Flag 3', existeTipoDocumento);
        const tipodocumento = new TipoDocumento(req.body);
        console.log('Flag 4', tipodocumento);
        await tipodocumento.save();
        console.log('Flag 5', tipodocumento);
        res.json({
            ok:true,
            tipodocumento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contactar con el administrador!"
        });
    }
}
const putTipoDocumento = async (req,res = response)=>{
    const u_id = req.params.id;
    try {
        const TipoDocumentoDB = await TipoDocumento.findById(u_id);
        if(!TipoDocumentoDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un TipoDocumento con el Id"
            })
        }

        const {password, google, email, ...campos} = req.body;
        if (TipoDocumentoDB.email !== email) {
            const existeEmail = await TipoDocumento.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe TipoDocumento con el email!"
                });
            }
        }

        const tipoDocumentoActualizado = await TipoDocumento.findByIdAndUpdate(u_id,campos,{new:true});

        res.json({
            ok:true,
            tipoDocumentoActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... revisar logs!"
        });
    }
}
const deleteTipoDocumento = async (req,res=response)=>{
    const t_id = req.params.id;
    try {
        const tipoDocumentoDB = await TipoDocumento.findById(t_id);
        if(!tipoDocumentoDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un TipoDocumento con el Id"
            })
        }
        await TipoDocumento.findByIdAndDelete(t_id);
        res.json({
            ok:true,
            msg:"TipoDocumento eliminado!"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... revisar logs!"
        });
    }
}
module.exports = {
    getTipoDocumentos,
    postTipoDocumento,
    putTipoDocumento,
    deleteTipoDocumento
}