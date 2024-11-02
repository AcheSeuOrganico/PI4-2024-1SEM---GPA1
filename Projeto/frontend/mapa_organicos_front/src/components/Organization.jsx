import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import { OrgPopup } from "./OrgPopup"

import axios from "axios"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from "@fortawesome/free-solid-svg-icons"

import { Icon } from "./Icon"

export const OrganizationProfile = () => {
    const navigate = useNavigate()
    const [ orgData, setOrgData ] = useState({}) 
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://192.168.0.8:8000/api/organizations/' + id)
            .then( res => {
                setOrgData(res?.data[0])
            })
            .catch( err => {
                navigate("/")
            })
    }, [])

    return (
        <>
            <div className="flex border-2 border-slate-300 shadow mb-5 mt-10 p-4 rounded-md">  
            
                <div className="flex flex-col my-4 w-[50%] m-auto shadow-md p-4">

                    <div className="text-3xl text-slate-600 font-semibold">
                        {orgData?.fantasy_name}    
                    </div>

                    <div className="flex flex-col">
                        <div className="w-full flex items-center justify-center text-slate-600">
                            {
                                orgData?.img ? (
                                    <div>
                                        <img src={`http://192.168.0.8:8000${orgData?.img}`} className="w-full"/>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center border-2 w-40 h-40 rounded-full">
                                        <FontAwesomeIcon icon={faImage} />
                                    </div>
                                )
                            }
                        </div>

                        <div className="w-3/4 p-4 text-slate-600">
                            <span className="my-2 text-2xl font-medium">Descrição...</span>
                            <div className="my-2 whitespace-pre-line">
                                {
                                    orgData?.description ? orgData.description : "Sem descrição..."
                                }

                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-3/4 p-4">
                        {
                            orgData?.products?.map((value, index) => {
                                return <Icon
                                    key={index}
                                    iconId={value?.product_id}
                                />
                            })
                        }                        
                    </div>
                        {console.log(orgData)}
                    <div className="w-3/4 p-4 text-slate-600">

                        <span className="my-2 text-2xl font-medium">Informações</span>
                        
                        <div className="p-2">
                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">E-mail</span>
                                <span>{orgData?.email}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">Telefone</span>
                                <span>{orgData?.celphone}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">Estado</span>
                                <span>{orgData?.address?.state}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">Cidade</span>
                                <span>{orgData?.address?.city}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">Rua</span>
                                <span>{orgData?.address?.name}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">Numero</span>
                                <span>{orgData?.address?.number}</span>
                            </div>

                            <div className="flex flex-col h-20">
                                <span className="text-lg font-medium">CEP</span>
                                <span>{orgData?.address?.cep}</span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="my-4 w-[50%] m-auto shadow-md">
                    {
                        Object.keys(orgData).length === 0 ? '' : (
                            <MapContainer center={[orgData.address.latitude, orgData.address.longitude]} zoom={26} className="shadow">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                    <Marker 
                                        key={orgData.id}
                                        position={[orgData.address.latitude, orgData.address.longitude]}
                                        className='text-slate-900'
                                    >
                                        <Popup>
                                            <OrgPopup
                                                orgData={orgData}
                                            />
                                        </Popup>
                                    </Marker>

                            </MapContainer>
                        )
                    }
                </div>

            </div>
        
        </>
    )
}