import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faPager } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export const DropdownButton = () => {
    const { isAuthenticated, logout, userData } = useContext(AuthContext)
    const [ isActive, setIsActive ] = useState(false)

    const handleMouseEnter = () => {
        setIsActive(true)
    }

    const handleMouseLeave = () => {
        setIsActive(false)
    }

    return (
        <div 
            className=""
        >
            <div 
                className='flex items-center justify-center border-2 w-8 h-8 rounded-full bg-slate-50 hover:cursor-pointer text-slate-600'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {
                !isActive ? '' : (
                    <div 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='flex flex-col absolute bg-white border-2 w-40 text-slate-600 right-24 rounded py-2 px-2'
                        >
                            <Link 
                                className='m-2 hover:cursor-pointer flex items-center'
                                to={`/`}
                                ><FontAwesomeIcon icon={faMap} className='m-2'/>Mapa
                            </Link>

                            <Link 
                                className='m-2 hover:cursor-pointer flex items-center'
                                to={`/profile`}
                                ><FontAwesomeIcon icon={faUser} className='m-2'/>Perfil
                            </Link>
                            {console.log(userData)}
                            <Link   
                                className='m-2 hover:cursor-pointer flex items-center'
                                to={`/organizations/${userData?.user_id}`}
                                ><FontAwesomeIcon icon={faPager} className='m-2'/>Página
                            </Link>
                            
                            <div 
                                className='m-2 hover:cursor-pointer flex items-center'
                                onClick={logout}
                                ><FontAwesomeIcon icon={faArrowRightFromBracket} className='m-2'/>Logout
                            </div>
                    </div>
                ) 
            }
        </div>
    )
}
