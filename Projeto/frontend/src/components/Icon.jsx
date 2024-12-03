import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faLemon, faBottleDroplet, faCarrot } from '@fortawesome/free-solid-svg-icons'


export const Icon = ({ iconId }) => {

    const names = {
        "1": "Vegetais",
        "2": "Frutas",
        "3": "Produtos",
        "4": "Verduras"
    }

    const icons = {
        "1": faCarrot,
        "2": faLemon,
        "3": faBottleDroplet,
        "4": faSeedling
    }

    return (
        <>
            <FontAwesomeIcon 
                className='w-6 h-6 border-2 rounded-full p-3 bg-slate-100 shadow mx-1'
                icon={icons[iconId]}
            />
        </>
    )
}