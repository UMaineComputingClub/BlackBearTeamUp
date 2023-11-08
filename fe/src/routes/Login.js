import './Login.css'
import React, { useState } from 'react'
import { post } from 'Utils.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'firebase.js'

function Login() {
    // usernames and passwords
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // logged in status
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState('')

    // Tooltips for usernames and passwords, could put password requirements here
    const [showUsernameTooltip, setShowUsernameTooltip] = useState(false)
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false)

    async function requestSignUp() {
        try {
            // Create a new user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, username, password)

            // If sign-up is successful, update state
            setLoggedIn(true)
            setUser(userCredential.user.email)
        } catch (error) {
            // If sign-up fails, show an alert with the error message
            alert(`Error: ${error.message}`)
        }
    }

    async function requestLogin() {
        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, username, password)

            // If login is successful, update state
            setLoggedIn(true)
            setUser(userCredential.user.email)
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
                        <p>You are logged in, {user}!!!</p>
                        {/* Return value for logged in state */}
                    </div>
                ) : (
                    // login page
                    <div>
                        <h3>Username</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
