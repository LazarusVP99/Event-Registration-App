import 'dotenv/config.js';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import connectToMongoose from './mongo.connect.js';
import router from './routes/route.js';

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (_req, res) => {
    res.status(200).send('<h1>Register Events Server!</h1>')
})

connectToMongoose()

app.use(morgan('dev'))
app.use('/api', router)

const PORT = 3100

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})



