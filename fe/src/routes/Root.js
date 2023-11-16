import { Outlet } from 'react-router-dom'
import './Root.css'
import logo from "./images/bear.png"
import user from "./images/user.png"
import { useContext } from 'react'
import { UserContext } from "Session"
import { auth } from 'firebase.js'
import { useNavigate } from "react-router-dom"
import { signOut, onAuthStateChanged } from "firebase/auth"


export default function Root() {

    const { username, setUsername } = useContext(UserContext)
    const navigate = useNavigate()

    onAuthStateChanged(auth, function (user) {
        if (user) {
            setUsername(user.email)
        }
    });

    async function logout() {
        await signOut(auth)
        setUsername(null)
        navigate('/')
    }

    // const getCurrentUser = async function () {
    //         const auth = getAuth();
    //         const user = auth.currentUser;
    //         console.log(user)
    //         if (user !== null){
    //             const userName = user.username;
    //             return userName;
    //         }
    //         else{
    //             return '';
    //         }
    // }

    return (
        <>
            {/* all the other elements */}
            <div id='detail'>

                <header>
                    <img src={logo} alt="graphic of a bear" />
                    <h1>BBT</h1>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">Search</a></li>
                            <li><a href="/">Profile</a></li>
                            {!username ? (<li><a href="/login">Login</a></li>) : (<li><button onClick={logout}>Logout</button></li>)}
                        </ul>
                    </nav>
                    <div id="user">
                        <img src={user} alt="none" class="round" />
                        <h4>{username}</h4>
                        {/* <h4>{getCurrentUser()}</h4> */}
                    </div>
                    <div class="unfloat"></div>
                </header>
            </div>
            <Outlet />
        </>
    )
}