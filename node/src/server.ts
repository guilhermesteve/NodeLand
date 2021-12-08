import  express from 'express'
import path from 'path'
import { env } from 'process'
import dotenv from 'dotenv'
import mustache from 'mustache-express'

import mainRoutes from './routes/index'
import painelRoutes from './routes/painel';

dotenv.config();

const server = express()

server.set('view engine', 'mustache')
server.set('views', path.join(__dirname,'views'))
server.engine('mustache', mustache())

server.use('/static',express.static(path.join(__dirname,'../public')))

server.use(express.urlencoded({extended: true}))

server.use(mainRoutes);
server.use('/painel', painelRoutes);

server.use((req,res) => {
    res.status(404).send('Página não encontrada.')
})


server.listen(env.port || 3000)

