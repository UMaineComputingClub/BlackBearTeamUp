import './Login.css'
import React, { useState } from 'react'
import { post } from 'Utils.js'

function Login() {
    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')

    //change submit function so send login info
    async function Submit() {
        const requestData = {
            username: val1,
            password: val2
        }
        console.log(requestData)

        alert(requestData.username + '   ' + requestData.password)

        try {
            const response = await post('/api/login', requestData)
            alert(response.message)
        }
        catch (e) {
            alert(`Error ${e.status}: ${e.message}`)
        }

        alert(requestData.username + '   ' + requestData.password)
    }

    const change1 = event => {
        setVal1(event.target.value)

    }

    const change2 = event => {
        setVal2(event.target.value)

    }

    return (
        <div id='login-message'>
            <h4>This is the login page!!</h4>
            <form onSubmit={Submit} id='form'>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' placeholder='user@email.com' value={val1} onChange={change1} />

                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' name='password' placeholder='password' value={val2} onChange={change2} />

                <input type='submit' value='Submit' id='submit' />
            </form>
        </div>
    )
}

export default Login