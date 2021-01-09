require('dotenv').config();

const express = require('express');
const { dbConection } = require('./data/dbconfig');
const cors = require('cors');

//crear el servidor de express
const app = express();
app.use(cors());
//accesos mongodb
dbConection();

//Router
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
})
//Settings servidor
app.set('port',process.env.PORT || 3000);
//Starting servers
app.listen(app.get('port'),()=>{
    console.log("Init server!");
    console.log(app.get('port'));
});