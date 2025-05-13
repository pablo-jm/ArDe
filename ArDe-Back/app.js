import express from "express";
import cors from "cors";
import db from "./database/db.js";
import userRouter from "./routes/user.router.js";
import workRouter from "./routes/work.router.js";
import orderRouter from "./routes/order.router.js";
import eventRouter from "./routes/event.router.js";


const app = express();

//Prueba raiz
app.get('/', (req, res) => {
    res.send('Hola API');
});


//Middlewares
app.use(cors({origin: 'http://localhost:5173' })); //Evita errores de CORS policy
app.use(express.json()); //Parsea info a json auto


app.use('/users', userRouter);
app.use('/works', workRouter);
app.use('/orders', orderRouter);
app.use('/events', eventRouter);


//Conexión a base de datos
try {
    await db.authenticate();
    console.log('✅ Conectado a la base de datos');
} catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
}


//Server
app.listen(3000,() =>{
console.log('✅server up in http://localhost:3000/')
} )