require('dotenv').config();

const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const app = express();

//CORS
app.use(cors())

//base de datos
dbConnection()


//Rutas
app.get('/', (req,res) =>{
    res.status(200).json({
        ok:true,
        mgs:'hola mundo'
    })
});


app.listen(process.env.PORT, () =>{
    console.log('server corriendo puerto '+ process.env.PORT)
})