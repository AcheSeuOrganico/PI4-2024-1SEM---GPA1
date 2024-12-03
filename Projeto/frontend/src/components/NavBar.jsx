import { useContext } from 'react'
import logo from '../assets/img/logo.png'
import { AuthContext } from '../contexts/AuthContext'

import { LogoutButton } from './LogoutButton'
import { Link } from 'react-router-dom'

import { DropdownButton } from './DropdownButton'


export const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <nav className="flex bg-[#C1E3B1] h-26 items-center justify-between px-24 shadow">
            <Link className="m-2 w-[10rem]" to="/">
                <img src={logo} />
            </Link>

            {
                isAuthenticated ? <DropdownButton /> : <span>Login</span>
            }
        </nav>
    )
}