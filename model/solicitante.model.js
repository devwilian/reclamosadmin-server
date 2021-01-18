const { Schema, model } = require('mongoose');

const SolicitanteSchema = Schema({
    tipodocumento:{
        type:Schema.Types.ObjectId,
        ref:'TipoDocumento'
    },
    nrodocumento:{
        type:String,
        required:true,
    },
    apellidos:{
        type:String,
        required:true,
    },
    nombres:{
        type:String,
        required:true,
    },
    razonsocial:{
        type:String
    },
    telefono:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    direccion:{
        type:String,
    },
});
SolicitanteSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
});

SolicitanteSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Solicitante', SolicitanteSchema)