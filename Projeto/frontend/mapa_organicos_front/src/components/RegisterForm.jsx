import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

import logo from '../assets/img/logo.png'
import { RegisterOrganizationFields } from "./RegisterOrganizationFields"
import axios from "axios"

export const RegisterForm = () => {
    const [ userTypeController, setUserTypeController ] = useState('')
    const [ formData, setFormData ] = useState({
        username:'',
        password:'',
        cep: '',
        address: '',
        
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: value
        }));
    }

    const handleControllerChange = (e) => {
        setUserTypeController(e.target.value)
    }

    useEffect(()=>{
        if(formData.cep.length === 8){
            axios.get('https://cep.awesomeapi.com.br/json/'+formData.cep)
                .then(
                    res => {
                        const data = res.data;
                        setFormData((prev) => ({
                            ...prev, 
                            ['address']: data.address
                        }));
                    }
                ).catch(
                    err => console.log(err)
                )
        }else{
            console.log('CPF Inválido')
        }
        
    }, [formData.cep])

    return (
        <form className="flex flex-col w-1/3">

            <div>
                <img src={logo} />
            </div>

            <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Nome" 
                    type="text"
                    name="first_name"
                    onChange={handleChange}/>
           </div>

           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Sobrenome" 
                    type="text"
                    name="last_name"
                    onChange={handleChange}/>
           </div>

           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Usuário" 
                    type="text"
                    name="username"
                    onChange={handleChange}/>
           </div>

           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Email" 
                    type="email"
                    name="email"
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

           <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Repeat Password" 
                    type="password"
                    name="password2"
                    onChange={handleChange}/>
           </div>
           
           <div className="my-4 flex flex-col text-slate-500">
                <span className="my-2">Como deseja se cadastrar?</span>
                <select className="my-2 w-1/3 shadow p-2 rounded" onChange={handleControllerChange}>
                    <option></option>
                    <option value='0'>Consumidor</option>
                    <option value='1'>Produtor</option>
                    <option value='2'>Feira-Orgânica</option>
                    <option value='3'>Comerciante</option>
                </select>
           </div>

           {
                userTypeController === '' || userTypeController === '0' ? '' : <RegisterOrganizationFields handleChange={handleChange} formData={formData}/>
           }

            <div className="flex justify-center text-slate-500">
                <span>Já tem uma conta? <Link to='/login' className="text-[#5ca838] font-bold">Faça Login!</Link></span>
            </div>

            {console.log(formData)}
           {
            (!Object.values(formData).includes('')) ? (
                <button 
                    className="bg-[#134908] text-white rounded-md mt-4 h-10" 
                    onClick={handleSubmit}
                >
                    Criar
                </button>
            ) : (
                <div 
                    className="bg-[#C1E3B1] text-white rounded-md mt-4 h-10 flex justify-center items-center" 
                >
                    Criar
                </div>
            )
           }

           {/* <div className="flex items-center justify-center m-2 p-2 text-red-500 italic ">
            {
                loginErrorMessages.map((value, index) => {
                    return <span key={index}>{value}</span>
                })
            }
           </div> */}
           
        </form>
    )
}