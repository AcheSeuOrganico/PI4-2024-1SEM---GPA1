import { useEffect, useState } from "react"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import axios from "axios"

import { OrgPopup } from "./OrgPopup"
import { OrganizationCard } from "./OrganizationCard"


const brazilianStates = {
    "AC": 12,
    "AL": 27,
    "AP": 16,
    "AM": 13,
    "BA": 29,
    "CE": 23,
    "DF": 53,
    "ES": 32,
    "GO": 52,
    "MA": 21,
    "MT": 51,
    "MS": 50,
    "MG": 31,
    "PA": 15,
    "PB": 25,
    "PR": 41,
    "PE": 26,
    "PI": 22,
    "RJ": 33,
    "RN": 24,
    "RS": 43,
    "RO": 11,
    "RR": 14,
    "SC": 42,
    "SP": 35,
    "SE": 28,
    "TO": 17
  };

export const SearchProductsComp = () => {
    const [ searchInput, setSearchInput ] = useState("")
    const [ organizations, setOrganizations ] = useState([])
    const [ appliedFilters, setAppliedFilters ] = useState({})
    const [ cities, setCities] = useState([])

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8002/api/organizations/?search=' + searchInput)
            .then( res => {
                console.log(res.data)
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

    useEffect(() => {
        if(appliedFilters?.['address.state']){
            const ufCode = brazilianStates[appliedFilters['address.state'][0]]
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufCode}/municipios`)
                .then( res => {
                    setCities(res.data)
                })
                .catch( err => {
                    console.log(err)
                })
        }
    }, [appliedFilters])

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
                            name="address.state"
                            onChange={handleFilterSelectboxChange}
                            className="my-2 shadow p-2 rounded italic text-slate-400"
                        >
                            <option></option>
                            <option value='AC'>Acre</option>
                            <option value='AL'>Alagoas</option>
                            <option value='AP'>Amapá</option>
                            <option value='AM'>Amazonas</option>
                            <option value='BA'>Bahia</option>
                            <option value='CE'>Ceará</option>
                            <option value='DF'>Distrito Federal</option>
                            <option value='ES'>Espírito Santo</option>
                            <option value='GO'>Goiás</option>
                            <option value='MA'>Maranhão</option>
                            <option value='MT'>Mato Grosso</option>
                            <option value='MS'>Mato Grosso do Sul</option>
                            <option value='MG'>Minas Gerais</option>
                            <option value='PA'>Pará</option>
                            <option value='PB'>Paraíba</option>
                            <option value='PR'>Paraná</option>
                            <option value='PE'>Pernambuco</option>
                            <option value='PI'>Piauí</option>
                            <option value='RN'>Rio Grande do Norte</option>
                            <option value='RS'>Rio Grande do Sul</option>
                            <option value='RJ'>Rio de Janeiro</option>
                            <option value='RO'>Rondônia</option>
                            <option value='RR'>Roraima</option>
                            <option value='SC'>Santa Catarina</option>
                            <option value='SP'>São Paulo</option>
                            <option value='SE'>Sergipe</option>
                            <option value='TO'>Tocantins</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-40 my-2 mx-4">
                        <label className="text-sm italic text-slate-400">Cidades</label>
                        <select 
                            name="address.cities"
                            onChange={handleFilterSelectboxChange}
                            className="my-2 shadow p-2 rounded italic text-slate-400"
                        >
                            <option value=""></option>
                            {
                                cities?.map((value, index) => {
                                    return <option value={value?.nome}>{value?.nome}</option>
                                })
                            }
                        </select>
                    </div>

                </div>

            </form>
            
            {console.log(appliedFilters)}

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
                                else if(key === 'address.state'){
                                    return item?.address?.state === value[0];
                                }
                                else if(key === 'address.cities'){
                                    console.log()
                                    return item?.address?.city === value[0];
                                }
                                return item[key] === value;
                            });
                        })?.map((orgData) => {
                            if(orgData?.address?.latitude &&orgData?.address?.longitude ){
                                return (
                                    <Marker 
                                        key={orgData.id}
                                        position={[orgData?.address?.latitude, orgData?.address?.longitude]}
                                        className='text-slate-900'
                                    >
                                        <Popup>
                                            <OrgPopup
                                                orgData={orgData}
                                                visit={true}
                                            />
                                        </Popup>
                                    </Marker>
                                )   
                            }
                        })
                    }
                </MapContainer>
            </div>

            <div className="mt-8 w-[60%] m-auto text-2xl text-slate-700">
                Resultados...
            </div>

            <div className="my-4 w-[60%] m-auto shadow-md max-h-[40rem] overflow-scroll">
                    
                    <div className="p-2">
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
                        })?.map((orgData) => {
                            return (
                                <OrganizationCard
                                    orgData={orgData}
                                />
                            )
                        })
                    }
                        

                    </div>

            </div>

        </div>
    )
}