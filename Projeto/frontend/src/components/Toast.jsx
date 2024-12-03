import { useContext } from "react";
import { ToasterContext } from "../contexts/ToasterContext";


export default function Toaster({ message }) {
    const { options, setToasterOptions} = useContext(ToasterContext)

    const handleClick = () => {
        setToasterOptions({
            isVisible: false,
            message: ''
        });
    };

    return (
        <div className={`fixed top-0 m-4 p-4 shadow border-[0.5px] rounded-md bg-slate-50 text-slate-800 ${options.isVisible? 'flex' : 'hidden'}`}> 
            <span className="mx-2 ">{message}</span>
            <span className="mx-2 hover:cursor-pointer" onClick={handleClick}>X</span>
        </div> 
    );
}