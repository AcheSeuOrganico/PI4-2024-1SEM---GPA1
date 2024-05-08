import { useContext } from 'react'
import logo from '../assets/img/logo.png'
import { AuthContext } from '../contexts/AuthContext'

import { LogoutButton } from './LogoutButton'


export const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <nav className="flex bg-[#C1E3B1] h-26 items-center justify-between px-24 shadow">
            <div className="m-2 w-[10rem]">
                <img src={logo} />
            </div>

            {
                isAuthenticated ? <LogoutButton onClick={() => logout()} /> : <span>Login</span>
            }
        </nav>
    )
}