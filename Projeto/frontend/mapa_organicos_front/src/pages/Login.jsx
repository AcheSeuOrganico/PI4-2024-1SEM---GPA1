import { Link } from "react-router-dom"
import { ButtonCounter } from "../components/ButtonCounter"
import { LoginForm } from "../components/LoginForm"


export default function Login(){
    return (
        <div className="flex flex-col items-center justify-center my-28">
          <LoginForm/>
        </div>
    )
  }