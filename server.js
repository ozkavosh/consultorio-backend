const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const accountRouter = require('./routers/accountRouter');
const dataRouter = require('./routers/dataRouter');

const app = express();
const PORT = 8080;

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('qwerty'));
//Routers
app.use('/api', accountRouter);
app.use('/api/data', dataRouter);
//Event Handler
app.on('error', (err) => console.log(err.message));

//Server
const server = app.listen(PORT, () => console.log(`Servidor listo y escuchando en el puerto ${server.address().port}`));