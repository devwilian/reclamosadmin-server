require('dotenv').config();

const express = require('express');
const { dbConection } = require('./data/dbconfig');
const cors = require('cors');

//crear el servidor de express
const app = express();
app.use(cors());
app.use(express.json());
//accesos mongodb
dbConection();

//Directorio publico
app.use(express.static('public'));

//Router
app.use('/api/usuarios',require('./routes/usuario.route'));
app.use('/api/login',require('./routes/auth.route'));
app.use('/api/tipodocumento',require('./routes/tipodocumento.route'));
app.use('/api/solicitante',require('./routes/solicitante.route'));
app.use('/api/reclamos',require('./routes/reclamos.route'));
app.use('/api/consultas',require('./routes/consultas.route'));
app.use('/api/upload',require('./routes/upload.route'));

//Settings servidor
app.set('port',process.env.PORT || 3000);
//Starting servers
app.listen(app.get('port'),()=>{
    console.log("Init server!");
    console.log(app.get('port'));
});