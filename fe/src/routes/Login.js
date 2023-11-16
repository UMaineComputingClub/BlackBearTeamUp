import './Login.css'
import React, { useState } from 'react'
import { post } from 'Utils.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'firebase.js'
import { useContext } from 'react'
import { UserContext } from "Session"
import { makeUser } from 'add_user.js'
// import { useNavigate } from "react-router-dom";

function Login() {

    // shared context
    const { username, setUsername } = useContext(UserContext)

    // logged in status
    const [loggedIn, setLoggedIn] = useState(false)

    // Tooltips for usernames and passwords, could put password requirements here
    const [showUsernameTooltip, setShowUsernameTooltip] = useState(false)
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false)

    // const navigate = useNavigate();

    async function requestSignUp() {
        try {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            await makeUser(email, 'Johnathan')

            // Create a new user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // If sign-up is successful, update state
            setLoggedIn(true)
            setUsername(userCredential.user.email)
        } catch (error) {
            // If sign-up fails, show an alert with the error message
            alert(`Error: ${error.message}`)
        }
    }

    async function requestLogin() {
        try {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            // If login is successful, update state
            setLoggedIn(true)
            setUsername(userCredential.user.email)
            //navigate("/Home")
        } catch (error) {
            // If login fails, show an alert with the error message
            alert(`Error: ${error.message}`)
        }
    }

    // const requestData = {
    //     username: username,
    //     password: password
    // }
    // async function test() {
    //     try {
    //         const response = await post('/api/login', requestData)
    //         if (response.loggedIn === true) {
    //             setLoggedIn(true)
    //             setUser(response.user)
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (error) {
    //         alert(`Error ${error.status}: ${error.message}`)
    //     }
    // }

    return (
        <div id='page'>
            <div className="login-container">
                <h2>This is the login page!!</h2>
                {loggedIn ? (
                    // login success page
                    <div>
                        <p>You are logged in, {username}!!!</p>
                        {/* Return value for logged in state */}
                    </div>
                ) : (
                    // login page
                    <div>
                        <h3>Username</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            id="email"
                            onFocus={() => setShowUsernameTooltip(true)}
                            onBlur={() => setShowUsernameTooltip(false)}
                        />
                        {showUsernameTooltip && (
                            // change the username tooltip text here
                            <div className="tooltip">Username: 'admin'</div>
                        )}
                        <h3>Password</h3>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            onFocus={() => setShowPasswordTooltip(true)}
                            onBlur={() => setShowPasswordTooltip(false)}
                        />
                        {showPasswordTooltip && (
                            // change the password tooltip text here
                            <div className="tooltip">Password: 'admin'</div>
                        )}
                        <button onClick={requestLogin}>Login</button>
                        <button onClick={requestSignUp}>Sign Up</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login
