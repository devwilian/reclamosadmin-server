const Usuario = require('../model/usuario.model');
const { response } = require('express');
const  bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req,res)=>{
    const usuarios = await Usuario.find();
    res.json({
        ok:true,
        uid:req.uid,
        usuarios
    });
}
const postUsuario = async (req,res = response)=>{
    const { email, password } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ email });
        if(existeUsuario){
            return res.status(401).json({
                ok: false,
                msg:"El usuario con el email ya existe!"
            });
        }

        const usuario = new Usuario(req.body);
        // Encriptar contraseña 
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);

        await usuario.save();

        const token = await generarJWT(usuario.u_id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... revisar logs!"
        });
    }
}
const putUsuario = async (req,res = response)=>{
    const u_id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(u_id);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario con el Id"
            })
        }

        const {password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe usuario con el email!"
                });
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(u_id,campos,{new:true});

        res.json({
            ok:true,
            usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... revisar logs!"
        });
    }
}
const deleteUsuario = async (req,res=response)=>{
    const u_id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(u_id);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:"No existe un usuario con el Id"
            })
        }
        await Usuario.findByIdAndDelete(u_id);
        res.json({
            ok:true,
            msg:"Usuario eliminado!"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... revisar logs!"
        });
    }
}
module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}