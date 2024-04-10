import { Link } from "react-router-dom"
import { ButtonCounter } from "../components/ButtonCounter"


export default function Login(){
    return (
        <>
          <h1 className="bg-slate-500">Login</h1>
          <Link to="/">Ir para home</Link>
          <ButtonCounter/>
        </>
    )
  }