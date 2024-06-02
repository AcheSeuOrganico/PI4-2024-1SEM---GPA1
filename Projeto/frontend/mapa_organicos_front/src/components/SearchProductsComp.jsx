import { useEffect, useState } from "react"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import axios from "axios"


export const SearchProductsComp = () => {
    const [ searchInput, setSearchInput ] = useState("")
    const [ organizations, setOrganizations ] = useState([])
    const [ appliedFilters, setAppliedFilters ] = useState({})

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8002/api/organizations/?search=' + searchInput)
            .then( res => {
                setOrganizations(res.data)
            })
            .catch( err => {
                console.log(err)
            })
    }

    const handleFilterSelectboxChange = (e) => {
        setAppliedFilters(prev => {
            if(e.target.value !== ''){
                return {
                    ...prev,
                    [e.target.name]: [e.target.value]
                }
            }
            else{
                delete prev[e.target.name]
                if(Object.keys(prev).length === 0){
                    axios.get('http://localhost:8002/api/organizations/')
                    .then( res => {
                        setOrganizations(res.data)
    
                    })
                   .catch( err => {
                        console.log(err)
                })
                }
            }
            return prev
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8002/api/organizations/')
            .then( res => {
                setOrganizations(res.data)
            })
            .catch( err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="">

            <form className="flex flex-col w-[60%] m-auto">

                <div className="flex items-center">

                    <input
                        className="w-full shadow rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0"
                        type="text"
                        value={searchInput}
                        placeholder="Digite um nome de produtor..."
                        onChange={handleSearchInputChange}
                    />

                    <button 
                        className="h-10 shadow mx-4 border-2 w-32 rounded-md text-slate-400"
                        onClick={handleSearchSubmit}
                    >
                        Buscar
                    </button>

                </div>

                <div className="flex items-center">

                    <div className="flex flex-col w-40 my-2 mx-4">
                        <label className="text-sm italic text-slate-400">Tipo de estabelecimento</label>
                        <select 
                            name="user_type"
                            onChange={handleFilterSelectboxChange}
                            className="my-2 shadow p-2 rounded italic text-slate-400"
                        >
                            <option value=""></option>
                            <option value={1}>Produtores</option>
                            <option value={2}>Feira-orgânica</option>
                            <option value={3}>Comércio</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-40 my-2 mx-4">
                        <label className="text-sm italic text-slate-400">Estado</label>
                        <select 
                            name="state"
                            onChange={handleFilterSelectboxChange}
                            className="my-2 shadow p-2 rounded italic text-slate-400"
                        >
                            <option value=''></option>
                            <option value='SP'>SP</option>
                            <option value='RJ'>RJ</option>
                            <option value='RS'>RS</option>
                        </select>
                    </div>

                </div>

            </form>
            
            {console.log(organizations)}

            <div className="my-4 w-[60%] m-auto shadow-md">

                <MapContainer center={[-23.550596020154757, -46.63295405991066]} zoom={11.5} className="shadow">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        organizations.filter(item => {
                            return Object.entries(appliedFilters).every(([key, value]) => {
                                if(key === 'user_type'){
                                    return item[key]['type_id'] === parseInt(value[0]);
                                }
                                else if(key === 'address'){
                                    return item[key]['address'] === value[0];
                                }
                                return item[key] === value;
                            });
                        })?.map((org) => {
                            return (
                                <Marker 
                                    key={org.id}
                                    position={[org.address.latitude, org.address.longitude]}
                                    className='text-slate-900'
                                >
                                    <Popup>
                                        {org.username}
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>
            </div>

            <div className="my-4 w-[60%] m-auto shadow-md">
                    
                    <div>
                    {
                        organizations.filter(item => {
                            return Object.entries(appliedFilters).every(([key, value]) => {
                                if(key === 'user_type'){
                                    return item[key]['type_id'] === parseInt(value[0]);
                                }
                                else if(key === 'address'){
                                    return item[key]['address'] === value[0];
                                }
                                return item[key] === value;
                            });
                        })?.map((org) => {
                            return (
                                <div>
                                    Ola
                                </div>
                            )
                        })
                    }
                        

                    </div>

            </div>

        </div>
    )
}