import * as dotenv from 'dotenv'
dotenv.config()
import express, { response } from 'express'
import cors from 'cors'
import * as http from 'http'
import session from 'express-session'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA03rnRgSgBafBXx8166E-MA6N0JI_huxs",
    authDomain: "teamup-71d39.firebaseapp.com",
    projectId: "teamup-71d39",
    storageBucket: "teamup-71d39.appspot.com",
    messagingSenderId: "84760428579",
    appId: "1:84760428579:web:37a563f22f52dc9ceab196"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

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

    // this is the data to send back
    const responseData = {
        message: "", // any message for errors or fun
        loggedIn: false, // whether the login was successful
        user: "", // who logged in
        session_token: "" // idk for the future maybe?
    }

    try {

        // check for filled in usernames and passwords
        // should also check here for proper formatting
        if (!(req.body.username && req.body.password)) {
            // no username or password
            responseData.message = "Username and password must be filled in"
            responseData.loggedIn = false
            return res.status(400).send(responseData)
        }
        // query database here
        if (req.body.username == 'admin' && req.body.password == 'admin') {
            // a match is found in database
            responseData.message = "Successful login"
            responseData.loggedIn = true
            responseData.user = req.body.username
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
        responseData.message = error
        res.status(400).send(responseData)
    }
})