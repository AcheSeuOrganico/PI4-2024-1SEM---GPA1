import { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

import logo from '../assets/img/logo.png'


export const LoginForm = () => {
    const { login } = useContext(AuthContext)
    const [ formData, setFormData ] = useState({
        username:'',
        password:''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: value
        }));
    }

    return (
        <form className="flex flex-col w-1/3">

            <div>
                <img src={logo} />
            </div>

           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Username" 
                    type="text"
                    name="username"
                    onChange={handleChange}/>
           </div>
           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2  focus:outline-none focus:ring-0" 
                    placeholder="Password" 
                    type="password"
                    name="password"
                    onChange={handleChange}/>
           </div>

            <div className="flex justify-center text-slate-500">
                <span>Ainda não tem uma conta? <Link to='/register' className="text-[#5ca838] font-bold">Registre-se</Link></span>
            </div>

           {
            (formData.username !== '' && formData.password !== '') ? (
                <button 
                    className="bg-[#134908] text-white rounded-md mt-4 h-10" 
                    onClick={handleSubmit}
                >
                    Login
                </button>
            ) : (
                <div 
                    className="bg-[#C1E3B1] text-white rounded-md mt-4 h-10 flex justify-center items-center" 
                >
                    Login
                </div>
            )
           }
           
        </form>
    )
}