import './Login.css'
import React, { useState } from 'react'
import { post } from 'Utils.js'

function Login() {
      // usernames and passwords
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // logged in status
  const [loggedIn, setLoggedIn] = useState(false);

  // Tooltips for usernames and passwords, could put password requirements here
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);


  async function handleLogin() {

    // the request to send to the backend
    const requestData = {
        username: username,
        password: password
    }

    try {
        const response = await post('/api/login', requestData)
        alert(response.message)
    } catch (error) {
        alert(`Error ${error.status}: ${error.message}`)
    }
  };

    return (
        <div id='page'>

      <div className="login-container">
        <h2>Black Bear Team Up Login</h2>
        {loggedIn ? (
          // login success page
          <div>
            <p>You are logged in!</p>
            {/*Return value for logged in state*/}
          </div>
        ) : (
          // login page
          <div>
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
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
    )
}

export default Login