import { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = (props) => {
    const [username, setUsername] = useState(null)

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }