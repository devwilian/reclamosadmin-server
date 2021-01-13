const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    apellidos:{
        type:String,
        required:true,
    },
    nombres:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.u_id=_id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema)