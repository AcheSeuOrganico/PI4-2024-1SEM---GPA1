import { AuthContext } from "../contexts/AuthContext"
import { useEffect, useState, useContext } from "react"

import { RegisterOrganizationFields } from "./RegisterOrganizationFields"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"

import axios from "axios"
import apiClient from "../api/apiClient"

import { Icon } from "./Icon"
import { useToast } from "../hooks/useToast"

export const UpdateProfile = () => {
    const { toast } = useToast()
    const { userData, setUserData } = useContext(AuthContext)
    const [selectedImage, setSelectedImage] = useState(null);
    const [products, setProducts] = useState()
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
        "user_type": "",
        "products": []
    })
    const [ fieldErrors, setFieldErrors ] = useState({})
    const userTypes = [
        {id:1, name:"Produtor"},
        {id:2, name:"Feira-Orgânica"},
        {id:3, name:"Comerciante"},
    ]

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

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        let updatedProducts;
        if (event.target.checked) {
        updatedProducts = [...formData.products, selectedProduct];
        } else {
        updatedProducts = formData.products.filter(product => product !== selectedProduct);
        }
        setFormData(prevState => ({
        ...prevState,
        products: updatedProducts
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        apiClient().post(
            'http://192.168.0.8:8000/api/auth/update/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        .then( res => {
            toast("Usuário atualizado com sucesso")
        })
        .catch(
            err => {
                console.log(err)
                const { response } = err;
                if(response.status === 400){
                    console.log(response.data)
                    setFieldErrors(response.data);
                }
                toast("Não foi possível atualizar o usuário")
            }
        )
    }

    useEffect(() => {
        if(userData?.user_id){
            axios.get('http://192.168.0.8:8000/api/organizations/' + userData.user_id)
            .then( res => {
                setFormData(res?.data[0])
                setFormData(prevState => ({
                    ...prevState,
                    products: prevState?.products?.map(product => product?.product_id)
                  }));
            })
            .catch( err => {
                // navigate("/")
            })
        }
    }, [])

    useEffect(() => {
        if(userData?.user_id){
            axios.get('http://192.168.0.8:8000/api/products')
            .then( res => {
                console.log(res?.data)
                setProducts(res?.data)
            })
            .catch( err => {
                // navigate("/")
            })
        }
    }, [])

    useEffect(() => {
        if(selectedImage){
            setFormData(prev => ({...prev, img:selectedImage}))
        }
    }, [selectedImage])

    useEffect(()=>{
        if(formData?.address?.cep?.length === 8){
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
        
    }, [formData?.address?.cep])

    return (
        <div className="flex flex-col w-[60%] m-auto">
            {console.log(formData)}
            <form className="flex border-2 flex-wrap border-slate-300 shadow min-w-[700px] mb-5 mt-10 p-4 rounded-md">            
                <div className="flex flex-col my-4 w-[50%] min-w-[650px] m-auto shadow-md p-4">

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
                            {
                                userTypes?.map((value, _) => {
                                    if(value?.id === formData?.user_type?.type_id){
                                        return <option value={`${value?.id}`} selected>{value?.name}</option>
                                    }else{
                                        return <option value={`${value?.id}`}>{value?.name}</option>
                                    }
                                })
                            }
                        </select>
                    </div>
                    {console.log(formData)}
                    <div className="my-4 flex justify-around text-slate-500">
                        {
                            products?.map((value, index) => (
                            <label key={index} className="flex flex-col">
                                <input 
                                type="checkbox" 
                                name="products" 
                                value={value.product_id} 
                                className="m-1" 
                                onChange={handleProductChange} 
                                checked={formData?.products?.includes(value?.product_id)}
                                />
                                <Icon className="m-1" iconId={value.product_id} />
                                <span className="m-1">{value.name}</span>
                            </label>
                            ))
                        }
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

                <div className="my-4 w-[50%] m-auto shadow-md p-8 relative">

                    <div className="my-2">
                            {selectedImage && (
                                <>
                                    <span>Imagem atual:</span>
                                    <div>
                                        <img
                                            alt="Image not found"
                                            width={"100%"}
                                            src={URL.createObjectURL(selectedImage)}
                                        />
                                        <button 
                                            onClick={() => setSelectedImage(null)}
                                            className="my-1 underline"    
                                        >Remover</button>
                                    </div>
                                </>
                            )}
                    </div>

                    <div className="w-full h-[300px] border-2 border-dashed rounded-md relative hover:cursor-pointer">
                        
                        <input
                            type="file"
                            name="myImage"
                            className="absolute h-full w-full opacity-0 hover:cursor-pointer"
                            onChange={(event) => {
                                console.log(event.target.files)
                                setSelectedImage(event.target.files[0]); 
                            }}
                        />
                        
                        <div className="w-full h-full flex flex-col border-dashed justify-center items-center text-slate-600 hover:cursor-pointer">

                            <FontAwesomeIcon icon={faCloudArrowUp} className="text-6xl"/>

                            <span>Escolha uma imagem de perfil</span>

                        </div>
                    </div>

                    <div className="flex flex-col my-4">
                        <span>Descrição:</span>
                        <textarea
                            name="description"
                            type="textarea"
                            placeholder="Deixe uma descrição do seu estabelecimento..."
                            value={formData?.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </form>

            <div className="px-4">
                <button
                    className="border-2 p-2 rounded-lg bg-[#C1E3B1] border-[#C1E3B1] text-white hover:bg-white hover:text-[#C1E3B1]"
                    onClick={handleSubmit}
                >Atualizar</button>
            </div>
        </div>
    )
  }