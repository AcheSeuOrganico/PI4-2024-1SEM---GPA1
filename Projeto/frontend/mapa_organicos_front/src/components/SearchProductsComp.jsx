import { useState } from "react"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer  } from 'react-leaflet'


export const SearchProductsComp = () => {
    const [ searchInput, setSearchInput ] = useState("")

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div className="">

            <form className="my-4 w-1/2 m-auto">

                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0"
                    type="text"
                    value={searchInput}
                    placeholder="Digite um nome de produtor..."
                    onChange={handleSearchInputChange}
                />

            </form>

            <div className="my-8 w-[60%] m-auto">

                <MapContainer center={[-23.57436, -46.86269]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>

        </div>
    )
}