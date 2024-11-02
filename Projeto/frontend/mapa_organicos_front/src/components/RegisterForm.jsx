import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

import logo from '../assets/img/logo.png'
import { RegisterOrganizationFields } from "./RegisterOrganizationFields"
import axios from "axios"

export const RegisterForm = () => {
    const { logout, login } = useContext(AuthContext)
    const [ isOrganization, setIsOrganization ] = useState(false)
    const [ formData, setFormData ] = useState({
        "username":"",
        "password": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "address": {
            "name":"",
            "cep":"",
            "latitude":"",
            "longitude":"",
            "number": ""
            },
        "user_type": ""
    })
    const [ fieldErrors, setFieldErrors ] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://192.168.0.8:8000/api/accounts/register/', formData)
            .then(
                res => {
                    if(res.status === 200){
                        login({
                            username: formData.username,
                            password: formData.password
                        })
                    }
                }
            ).catch(
                err => {
                    console.log(err)
                    const { response } = err;
                    if(response.status === 400){
                        console.log(response.data)
                        setFieldErrors(response.data);
                    }
                }
            )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            let keys = name.split('.')
            if (keys.includes('address')) {
                return {
                    ...prev, 
                    address: {
                        ...prev.address,
                        [keys[1]]: value 
                    }
                };;
            }
            return {
                ...prev, 
                [name]: value
            };
        });
    }

    const handleControllerChange = (e) => {
        setFormData({
            ...formData,
            user_type: e.target.value
        })

        if(['1', '2', '3'].includes(e.target.value)){
            setIsOrganization(true)
        }else{
            setIsOrganization(false)
        }
    }

    useEffect(()=>{
        if(formData.address.cep.length === 8){
            axios.get('https://cep.awesomeapi.com.br/json/'+formData.address.cep)
                .then(
                    res => {
                        const data = res.data;
                        console.log(data)
                        setFormData((prev) => ({
                            ...prev, 
                            ['address']: {
                                ['cep']: data.cep,
                                ['name']: data.address,
                                ['state']: data.state,
                                ['city']: data.city,
                                ['latitude']: data.lat,
                                ['longitude']: data.lng,
                            } 
                        }));
                    }
                ).catch(
                    err => console.log(err)
                )
        }else{
            setFormData((prev) => ({
                ...prev, 
                ['address']: {
                    ...prev.address,
                    ['name']: '',
                    ['number']: '',
                    ['state']: '',
                    ['city']: '',
                } 
            }));
        }
        
    }, [formData.address.cep])

    useEffect(() => {
        logout()
    }, [])

    return (
        <form className="flex flex-col">

            <div className="m-12 w-[20rem]">
                <img src={logo} />
            </div>

            <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Nome" 
                    type="text"
                    name="first_name"
                    onChange={handleChange}/>
           </div>

           <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Sobrenome" 
                    type="text"
                    name="last_name"
                    onChange={handleChange}/>
           </div>

           <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Usuário" 
                    type="text"
                    name="username"
                    onChange={handleChange}/>
           </div>

           <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Email" 
                    type="email"
                    name="email"
                    onChange={handleChange}/>
           </div>

           <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2  focus:outline-none focus:ring-0" 
                    placeholder="Password" 
                    type="password"
                    name="password"
                    onChange={handleChange}/>
           </div>

           <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Repeat Password" 
                    type="password"
                    name="password2"
                    onChange={handleChange}/>
           </div>
           
           <div className="my-4 flex flex-col text-slate-500">
                <span className="my-2">Como deseja se cadastrar?</span>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <select className="my-2 w-1/3 shadow p-2 rounded" onChange={handleControllerChange}>
                    <option></option>
                    <option value='0'>Consumidor</option>
                    <option value='1'>Produtor</option>
                    <option value='2'>Feira-Orgânica</option>
                    <option value='3'>Comerciante</option>
                </select>
           </div>

           <div className={`${isOrganization ? '' : 'hidden'}`}>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.fantasy_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2  focus:outline-none focus:ring-0" 
                    placeholder="Nome fantasia" 
                    type="text"
                    name="fantasy_name"
                    onChange={handleChange}/>
           </div>

           <RegisterOrganizationFields handleChange={handleChange} formData={formData} fieldErrors={fieldErrors}/>
           {console.log(formData)}
            <div className="flex justify-center text-slate-500">
                <span>Já tem uma conta? <Link to='/login' className="text-[#5ca838] font-bold">Faça Login!</Link></span>
            </div>

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
           
        </form>
    )
}