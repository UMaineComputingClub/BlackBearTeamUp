import { Outlet } from 'react-router-dom'
import './Root.css'
import logo from "./images/bear.png"
import user from "./images/user.png"
import { useContext } from 'react'
import { UserContext } from "Session"
import { getAuth } from "firebase/auth";


export default function Root() {

    const { username } = useContext(UserContext)


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
                        <li><a href="/">Logout</a></li>
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