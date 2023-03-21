
import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { ProductRouter, CartRouter, AuthRouter, InfoRouter, RandomRouter, HomeRouter } from './src/routes/index.js'
import cors from 'cors'

import { PassportAuth } from './src/middlewares/index.js'
import session from 'express-session'

import { config } from './src/config/index.js'
import passport from 'passport'

import cluster from 'cluster'
import { INFO } from './src/utils/index.js'
import parseArgs from 'minimist'

import logger from './src/loggers/loggers.js'

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Desafio final de Programacion backend",
            description: "Desafio realizado por Lautaro Tallarico - Comision 32140",
        },
    },
    apis: ['./docs/**/*.yaml'],
};



const swaggerSpecs = swaggerJSDoc(swaggerOptions)

export const app = express()

PassportAuth.init()

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 }
}))



// **********************************************************************************************************************
const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos HTTP permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); // Cabeceras permitidas
    
    // Si la petición es OPTIONS, envía una respuesta con código de estado 200 (OK)
    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  };

app.use(corsMiddleware)
// ***************************************************************************************************************************



app.use(passport.initialize())
app.use(passport.session())

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))


app.use('/', HomeRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/randoms', RandomRouter)
app.use('/api/info', InfoRouter)


const args = parseArgs(process.argv.slice(2))
const CLUSTER = args.CLUSTER

app.listen(config.SERVER.PORT, () => {
    logger.info(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 25 - Entrega de proyecto final`)
    console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 25 - Entrega de proyecto final`)
}).on('error', error => {
    logger.error(`Error del servidor: ${error}`)
})


if (CLUSTER) {
    if (cluster.isPrimary) {
        logger.info(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`)

        for (let i = 0; i < INFO.numeroCPUs; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            logger.info(`Worker ${worker.process.pid} finalizado.`);
            cluster.fork();
        });

    } else {
        logger.info(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    logger.info(`http://localhost:${config.SERVER.PORT}/`)
    logger.info(`No es un cluster`);
}
