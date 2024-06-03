import { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const RegisterOrganizationFields = ({ handleChange, formData, fieldErrors }) => {


    return (
        <>
            <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="CEP" 
                    type="text"
                    name="address.cep"
                    onChange={handleChange}
                    value={formData.address.cep }/>
            </div>

            <div>
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
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
                <div className={`flex flex-col min-h-5`}>
                    {fieldErrors.first_name?.map((value, index) => {
                        return <span className="text-red-400 italic text-sm">{value}</span>
                    })}
                </div>
                <input
                    className="w-full mb-2 rounded-md h-10 border-2 p-2 focus:outline-none focus:ring-0" 
                    placeholder="Numero" 
                    type="text"
                    name="address.number"
                    value={formData.address.number}
                    onChange={handleChange}/>
            </div>
        </>
    )
}