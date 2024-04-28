import { Link } from "react-router-dom"
import { RegisterForm } from "../components/RegisterForm"


export default function Register(){
    return (
        <div className="flex flex-col items-center justify-center my-28">
          <RegisterForm/>
        </div>
    )
  }