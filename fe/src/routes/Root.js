import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from "Session"

export default function Root() {

    const { username } = useContext(UserContext)

    return (
        <>
            {/* all the other elements */}
            <div id='detail'>
                <span>{username}</span>
                <Outlet />
            </div>
        </>
    )
}