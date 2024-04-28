import { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


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
           <button 
                className="bg-[#863ec9] text-white rounded-md mt-4 h-10" 
                onClick={handleSubmit}
            >
                Login
           </button>
        </form>
    )
}