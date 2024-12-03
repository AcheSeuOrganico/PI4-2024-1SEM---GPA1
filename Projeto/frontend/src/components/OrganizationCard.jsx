import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

import { Icon } from './Icon'

export const OrganizationCard =  ({ orgData }) => {

    return (
        <div className="flex items-center justify-between border-2 h-28 p-4 rounded my-4">
            
            <div className='flex items-center justify-center'>

                <Link 
                    className='text-white decoration-none no-underline bg-[#C1E3B1] w-16 flex justify-center py-2 rounded items-center border-2 border-[#C1E3B1] hover:bg-white hover:text-[#C1E3B1] transition ease-in-out delay-15 duration-800'
                    to={`/organizations/${orgData?.id}`}    
                >

                    <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className='decoration-none no-underline'
                    />

                    <button className='mx-1 decoration-none no-underline'>Visitar</button>

                </Link>

                <div className='mx-2 text-lg text-slate-600 font-medium'>
                    {orgData?.fantasy_name ? orgData.fantasy_name : 'Não informado'}
                </div>

            </div>

            <div className='flex items-center justify-center text-slate-600'>
                <div className='mx-2'>
                    {orgData?.user_type?.type_name}
                </div>

                {
                    orgData?.products?.map((value, index) => {
                        return <Icon
                            key={index}
                            iconId={value?.product_id}
                        />
                    })
                } 

                <div className='mx-2'>
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>

                <div className='text-slate-600 italic mx-2'>
                    {orgData?.address?.name && `${orgData?.address?.name}, `}
                    {orgData?.address?.number}. {orgData?.address?.city}, {orgData?.address?.state}.
                </div>

            </div>

        </div>
    )
}