import './Login.css'
import React, {useState} from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Enter admin into both fields to log in
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      {loggedIn ? (
        <div>
          <p>You are logged in!</p>
          {/* Display a return value or any other content for the logged-in state */}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  )
}

export default Login
