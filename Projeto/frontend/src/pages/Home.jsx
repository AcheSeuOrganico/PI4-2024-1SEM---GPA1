
import { Link } from "react-router-dom"

import { NavBar } from "../components/NavBar"
import { SearchProductsComp } from "../components/SearchProductsComp"
import { Footer } from "../components/Footer"

export default function Home(){
    

    return (
        <>
            <NavBar/>
            <div className="p-10">

                <SearchProductsComp/>

            </div>

            <Footer/>
        </>
    )
  }


// GET: /api/users/maps/location 

// [
//     {
//         "ID": 01,
//         "NOME": "ANDRÉ",
//         "LATITUDE": "45.12312312",
//         "LONGITUDE": "25.483728947382"
//     },
//     {
//         "ID": 01,
//         "NOME": "ANDRÉ",
//         "LATITUDE": "45.12312312",
//         "LONGITUDE": "25.483728947382"
//     },
//     {
//         "ID": 01,
//         "NOME": "ANDRÉ",
//         "LATITUDE": "45.12312312",
//         "LONGITUDE": "25.483728947382"
//     },
//     {
//         "ID": 01,
//         "NOME": "ANDRÉ",
//         "LATITUDE": "45.12312312",
//         "LONGITUDE": "25.483728947382"
//     },
//     {
//         "ID": 01,
//         "NOME": "ANDRÉ",
//         "LATITUDE": "45.12312312",
//         "LONGITUDE": "25.483728947382"
//     }
// ]

// POST: /api/users/maps/location 

// {
//     "ID": 01,
//     "NOME": "ANDRÉ",
//     "LATITUDE": "45.12312312",
//     "LONGITUDE": "25.483728947382"
// }


// PUT: /api/users/maps/location 

// {
//     "ID": 01,
//     "NOME": "ANDRÉ DE QUEIROZ",
//     "LATITUDE": "45.12312312",
//     "LONGITUDE": "25.483728947382"
// }

// DELETE: /api/users/maps/location 

// {
//     "ID": 01,
//     "NOME": "ANDRÉ",
//     "LATITUDE": "45.12312312",
//     "LONGITUDE": "25.483728947382"
// }
