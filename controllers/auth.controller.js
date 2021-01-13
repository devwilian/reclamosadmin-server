const { response } = require('express');
const  bcryptjs  = require('bcryptjs');
const Usuario = require('../model/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const postLogin = async (req,res = response)=>{
    const { email, password } = req.body;
    try {
        //validar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

        //validar contraseña
        const validPassword = bcryptjs.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Contraseña incorrecto'
            });
        }
        //Generar token
        const token = await generarJWT(usuarioDB._id);
        res.json({
            ok:true,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... contacte al administrador!"
        });
    }
}

module.exports = {
    postLogin,
}