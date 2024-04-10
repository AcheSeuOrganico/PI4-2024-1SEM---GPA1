
import { Link } from "react-router-dom"
import { ButtonCounter } from "../components/ButtonCounter"


export default function Home(){
    

    return (
        <>
            <h1>Home</h1>
            <Link to="/login">Ir para login</Link>
            <ButtonCounter/>
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
