import { Outlet } from 'react-router-dom'
import './Root.css'
import logo from "./images/bear.png"
import user from "./images/user.png"
import { useContext } from 'react'
import { UserContext } from "Session"


export default function Root() {

    const { username } = useContext(UserContext)

    return (
        <>
            {/* all the other elements */}
            <div id='detail'>

                <header>
                <img src={logo} alt="graphic of a bear" />
                <h1>BBT</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Search</a></li>
                        <li><a href="#">Profile</a></li>
                    </ul>
                </nav>
                <div id="user">
                    <img src={user} alt="none" class="round" />
                </div>
                <div class="unfloat"></div>
            </header>
            <Outlet />
                <span>{username}</span>
                <Outlet />
            </div>
        </>
    )
}