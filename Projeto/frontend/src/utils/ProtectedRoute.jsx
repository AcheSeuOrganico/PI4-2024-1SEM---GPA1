import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import {AuthContext} from '../contexts/AuthContext'


export default function ProtectedRoute(){
	let { isAuthenticated } = useContext(AuthContext);
    
    return (
		<> 
            { !isAuthenticated  ? 
                <Navigate to="/login" replace/> : ( 
                    <Outlet />
                )
            }
		</> 
	)
}