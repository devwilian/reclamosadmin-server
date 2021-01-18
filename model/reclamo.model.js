const { Schema, model } = require('mongoose');

const ReclamosSchema = Schema({
    solicitante:{
        type:Schema.Types.ObjectId,
        ref:'Solicitante'
    },
    biencontratado:{
        type:String,
        required:true,
    },
    tiporeclamo:{
        type:String,
        required:true
    },
    motivoreclamo:{
        type:String,
        required:true
    },
    detallereclamo:{
        type:String,
        required:true
    },
    pedido:{
        type:String
    },
    docprobatorios:{
        type:String
    }
});
ReclamosSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Reclamos',ReclamosSchema);