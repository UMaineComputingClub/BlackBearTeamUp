import * as dotenv from 'dotenv'
dotenv.config()
import express, { response } from 'express'
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
        return res.status(200).send({ message: 'Hello, browser!' })
    }
    catch (e) {
        res.status(400).send({ message: e })
    }
})

// here's an example post request implemented on the backend
app.post('/api/namefun', async (req, res) => {
    try {
        // req.body contains the data object passed from the frontend

        // if there is no name property on the recieved object, respond with an error code and corresponding message
        if (!req.body.name)
            return res.status(400).send({ message: `Hey, you didn't give me a name!` })

        // otherwise, respond with the 200 OK code, and a nice friendly message!
        return res.status(200).send({ message: `Hey, nice to meet you! ${req.body.name} is a pretty cool name! I'm pretty sure it has ${req.body.name.length} characters in it.` })
    }
    catch (e) {
        // if something goes horribly wrong, respond about that too
        res.status(400).send({ message: e })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        
        const responseData = {
            message: "",
            loggedIn: false,
            session_token: ""
        }

        // check for filled in usernames and passwords
        if (!(req.body.username && req.body.password)) {
            // no username or password
            responseData.message = "Username and password must be filled in"
            responseData.loggedIn = false
            return res.status(400).send(responseData)
        }
        // query database here
        if (req.body.username == 'admin' && req.body.password == 'admin') {
            // a successful login message
            responseData.message = "Successful login"
            responseData.loggedIn = true
            responseData.session_token = "0"
            return res.status(200).send(responseData)
        } else {
            // no match in database
            responseData.message = "Incorrect username or password"
            responseData.loggedIn = false
            return res.status(400).send(responseData)
        }
    }
    catch (error) {
        res.status(400).send({message: error})
    }
})