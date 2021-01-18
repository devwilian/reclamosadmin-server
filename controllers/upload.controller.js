const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualiza-imagen');

const upload = (req, res = response)=>{
    try {
        const tipo = req.params.tipo;
        const idimg = req.params.id;
        if(tipo !== 'usuarios'){
            return res.status(400).json({
                ok:false,
                msg:'Lo archivos subidos deben de ser para la tabla reclamos'
            });
        }
        //=====================================================
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok:false,
                msg:'No hay ningun archivo!'
            })
        }
        const file = req.files.imagen;
        const nombreParsed = file.name.split('.');
        const extension = nombreParsed[nombreParsed.length - 1];

        //validar extension.
        const extensionesValidas = ['jpg','jpeg','png','gif'];
        if(!extensionesValidas.includes(extension)){
            res.status(400).json({
                ok:false,
                msg:'El tipo de archivo no es permitido'
            });
        }
        const nombrearchivo = `${uuidv4()}.${extension}`;
        const path = `./uploads/${tipo}/${nombrearchivo}`;
        console.log(nombrearchivo,path);
        file.mv(path, ( error ) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    ok:false,
                    msg:'Error al cargar imagen!'
                });
            }
            actualizarImagen(tipo,idimg,path,nombrearchivo);
            res.json({
                ok: true,
                nombrearchivo,
                msg:"Archivo Guardado!"
            });
        });
        //=====================================================
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
const recuperarImagen = (req, res)=>{
    try {
        const tipo = req.params.tipo;
        const idimg = req.params.idimg;

        const pathImg = path.join(__dirname,`../uploads/${tipo}/${idimg}`);
        if(fs.existsSync(pathImg)){
            res.sendFile(pathImg);
        }else{
            const pathNoImage = path.join(__dirname,`../uploads/noimage.png`);
            res.sendFile(pathNoImage);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error inesperado... Contacte con el administrador!"
        });
    }
}
module.exports = {
    upload,
    recuperarImagen
}