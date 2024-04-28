import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import {AuthContext} from '../contexts/AuthContext'


export default function ProtectedRoute(){
	let { authenticated } = useContext(AuthContext);
    
    return (
		<> 
            { !authenticated  ? 
                <Navigate to="/login" replace/> : ( 
                    <Outlet />
                )
            }
		</> 
	)
}