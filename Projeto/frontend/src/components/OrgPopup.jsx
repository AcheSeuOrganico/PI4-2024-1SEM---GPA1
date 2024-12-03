import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"

import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const OrgPopup = ({ orgData, visit }) => {

    return (
        <div className="">
            <div>
                <span className="text-lg font-bold">{orgData?.fantasy_name}</span>
            </div>

            <div className='flex'>
            {
                orgData?.products?.map((value, index) => {
                    return <Icon
                        key={index}
                        iconId={value?.product_id}
                        className='w-3 h-3'
                    />
                })
            } 
            </div>

            <div className="flex flex-col h-20 justify-between my-2">

                <span>Rua: {orgData?.address?.name}</span>
                
                <span>Numero: {orgData?.address?.number}</span>

                <span>CEP: {orgData?.address?.cep}</span>

            </div>


            {
                visit ? (
                    <Link 
                        className='text-white decoration-none no-underline bg-[#C1E3B1] w-16 flex justify-center p-1 rounded items-center border-[#C1E3B1] hover:bg-white hover:text-[#C1E3B1] transition ease-in-out delay-15 duration-800'
                        to={`/organizations/${orgData?.id}`}    
                    >

                        <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className=' decoration-none no-underline'
                        />
                        
                        
                        <button className='mx-1  decoration-none no-underline'>Visitar</button>

                    </Link>
                ) : ''
            }

        </div>
    )
}