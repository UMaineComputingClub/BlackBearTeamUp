import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import * as http from 'http'
import session from 'express-session'

// set up express app
const app = express()
app.set('trust proxy', 1)
app.use(express.static('public', {
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'no-cache')
    }
}))
app.use(express.json())
app.use(cors())
const secret = process.env.COOKIE_SECRET
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV == 'development' ? false : true,
        maxAge: +process.env.SESSION_EXPIRATION
    }
}))

// use express app to create http server
const server = http.createServer(app)

// listen on the port specified in .env
server.listen(Number(process.env.PORT), () => {
    console.log(`listening on *:${process.env.PORT}`)
})

app.get('/api/test', async (req, res) => {
    try {
        return res.status(200).send({ message: "Hello, browser!" })
    }
    catch (e) {
        res.status(400).send({ message: e })
    }
})