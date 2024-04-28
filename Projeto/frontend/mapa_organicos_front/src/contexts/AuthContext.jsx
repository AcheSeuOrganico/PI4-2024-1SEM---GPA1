import { createContext, ReactNode, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { validationMessages } from '../utils/ValidationMessages';

import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
	const [ isAuthenticated, setIsAuthenticated ] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [ userData, setUserData ] = useState( {} );
    const [ loginErrorMessages, setLoginErrorMessages ] = useState([])

    const login = (userData) => {
        axios.post(`http://localhost:8002/api/auth/login/`, {
            username: userData.username, 
            password: userData.password
        })
        .then((res) => {
            console.log(res)
            const data = res.data
            
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh); 

            setIsAuthenticated(true);
            navigate("/");
        })
        .catch((err) => {            
            if(err.response.status === 401){
                const data = err.response?.data;
                setLoginErrorMessages(
                    validationMessages[data.detail]
                )
            }
        });

    }

    const logout = () => {

    }

    const contextData = {
        isAuthenticated,
        setIsAuthenticated,

        userData,
        setUserData,

        login,
        logout,

        loginErrorMessages, 
        setLoginErrorMessages
    }

    return (
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    );
  }

export {  AuthContext, AuthProvider }