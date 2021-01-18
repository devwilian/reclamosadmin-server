const Usuario = require('../model/usuario.model');
const fs = require('fs');

const actualizarImagen = async (tipo,idimg,path,nombrearchivo)=>{
    const usuario = await Usuario.findById(idimg);
    if (!usuario) {
        return false;
    }
    const pathViejo = `./uploads/${tipo}/${usuario.img}`;
    if(fs.existsSync(pathViejo)){
        fs.unlinkSync(pathViejo);
    }

    usuario.img = nombrearchivo;

    await usuario.save();
    return true;
}

module.exports = {
    actualizarImagen
}