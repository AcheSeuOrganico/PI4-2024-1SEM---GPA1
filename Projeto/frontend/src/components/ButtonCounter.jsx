
import { useState } from "react"

export function ButtonCounter () {
    const [ number, setNumber ] = useState(0)


    const handleClick = (e) => {
        setNumber(
            number + 1
        )
    }

    return (
        <div className="w-full h-[750px] flex flex-col justify-center items-center hover:cursor-pointer">
                <div className="m-2 bg-teal-200 rounded-2xl p-2" onClick={handleClick}>
                    Click!
                </div>
                <div>
                    {number}
                </div>
        </div>
    )
}