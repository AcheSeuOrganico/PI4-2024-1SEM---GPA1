import { AuthContext } from "../contexts/AuthContext"
import { useEffect, useState, useContext } from "react"

import { RegisterOrganizationFields } from "./RegisterOrganizationFields"

import axios from "axios"
import apiClient from '../api/apiClient'

export const UpdateProfile = () => {
    const { userData, setUserData } = useContext(AuthContext)
    const [selectedImage, setSelectedImage] = useState(null);
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

    useEffect(() => {
        if(userData?.user_id){
            axios.get('http://localhost:8002/api/organizations/' + userData.user_id)
            .then( res => {
                setFormData(res?.data[0])
            })
            .catch( err => {
                // navigate("/")
            })
        }
    }, [])

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
    }

    return (
        <div className="flex flex-col w-[60%] m-auto">
            <form className="flex border-2 border-slate-300 shadow mb-5 mt-10 p-4 rounded-md">  
            
                <div className="flex flex-col my-4 w-[50%] m-auto shadow-md p-4">
                    {console.log(formData)}
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
                            onChange={handleChange}
                            value={formData?.first_name}
                            />
                    </div>

                    <div>
                        <div className={`flex flex-col min-h-5`}>
                            {fieldErrors.last_name?.map((value, index) => {
                                return <span className="text-red-400 italic text-sm">{value}</span>
                            })}
                        </div>
                        <input
                            className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                            placeholder="Sobrenome" 
                            type="text"
                            name="last_name"
                            onChange={handleChange}
                            value={formData?.last_name}
                            />
                    </div>

                    <div>
                        <div className={`flex flex-col min-h-5`}>
                            {fieldErrors.email?.map((value, index) => {
                                return <span className="text-red-400 italic text-sm">{value}</span>
                            })}
                        </div>
                        <input
                            className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                            placeholder="Email" 
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData?.email}
                            />
                    </div>

                    <div className="my-4 flex flex-col text-slate-500">
                        <span className="my-2">Tipo de estabelecimento:</span>
                        <div className={`flex flex-col min-h-5`}>
                            {fieldErrors?.user_type?.name?.map((value, index) => {
                                return <span className="text-red-400 italic text-sm">{value}</span>
                            })}
                        </div>
                        <select className="my-2 w-1/3 shadow p-2 rounded" onChange={handleControllerChange}>
                            <option></option>
                            <option value='1'>Produtor</option>
                            <option value='2'>Feira-Orgânica</option>
                            <option value='3'>Comerciante</option>
                        </select>
                    </div>

                    <div>
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
                            onChange={handleChange}
                            value={formData?.fantasy_name}
                            />
                    </div>

                    <RegisterOrganizationFields handleChange={handleChange} formData={formData} fieldErrors={fieldErrors}/>

                </div>

                <div className="my-4 w-[50%] m-auto shadow-md">

                    {selectedImage && (
                        <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br /> <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}

                    <br />

                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]); 
                        }}
                    />
                </div>

            </form>
        </div>
    )
  }