import { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const RegisterOrganizationFields = ({ handleChange, formData }) => {


    return (
        <>
            <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="CEP" 
                    type="text"
                    name="address.cep"
                    onChange={handleChange}/>
            </div>

            <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Endereço" 
                    type="text"
                    name="address.name"
                    onChange={handleChange}
                    value={formData.address.name}
                    />
            </div>

            <div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Numero" 
                    type="text"
                    name="address.number"
                    onChange={handleChange}/>
            </div>
        </>
    )
}