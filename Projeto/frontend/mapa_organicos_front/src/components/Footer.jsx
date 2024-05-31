import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'



export const Footer = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)

    return (
        <nav className="flex bg-[#C1E3B1] h-26 items-center justify-between px-24 shadow">
            <div className='flex'>
                
            </div>
        </nav>
    )
}
