import { createContext, ReactNode, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { validationMessages } from '../utils/ValidationMessages';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
	const [ isAuthenticated, setIsAuthenticated ] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [ userData, setUserData ] = useState( {} );
    const [ loginErrorMessages, setLoginErrorMessages ] = useState([])

    const login = (userData) => {
        axios.post(`http://192.168.0.8:8000/api/auth/login/`, {
            username: userData.username, 
            password: userData.password
        })
        .then((res) => {
            const data = res.data
            
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh); 

            setIsAuthenticated(true);
            setLoginErrorMessages([])
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
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUserData({});
        setIsAuthenticated(false);
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        if(isAuthenticated){
            const { user_id } = jwtDecode(
                localStorage.getItem("token")
            )
            setUserData({user_id})
        }
    }, [isAuthenticated])

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