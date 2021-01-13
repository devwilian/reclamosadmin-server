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

//Router
app.use('/api/usuarios',require('./routes/usuario.route'));
app.use('/api/login',require('./routes/auth.route'));
//Settings servidor
app.set('port',process.env.PORT || 3000);
//Starting servers
app.listen(app.get('port'),()=>{
    console.log("Init server!");
    console.log(app.get('port'));
});