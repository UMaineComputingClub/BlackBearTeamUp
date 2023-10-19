import './Login.css'
import React, {useState} from 'react';

function Login() {
  // usernames and passwords
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // logged in status
  const [loggedIn, setLoggedIn] = useState(false);

  // Tooltips for usernames and passwords, could put password requirements here
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const handleLogin = () => {
    // Password checking
    // Should implement password requirements

    // Should query the database here
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      // login fail text
      alert('Login failed. Please check your credentials.');
    }
  };
  return (
    <div id='page'>

      <div className="login-container">
        <h2>Login</h2>
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
            value={username} // change
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setShowUsernameTooltip(true)}
            onBlur={() => setShowUsernameTooltip(false)}
          />
          {showUsernameTooltip && (
            // change the tooltip text here
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
              // change the tooltip text here
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
