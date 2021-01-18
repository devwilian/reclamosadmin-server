const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    descripciondocumento:{
        type:String,
        required:true,
        unique:true
    }
});

TipoDocumentoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('TipoDocumento', TipoDocumentoSchema);