import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"

import { OrganizationProfile } from "../components/Organization"

export default function Organization(){
    return (
        <>
            <NavBar/>

                <div className="">

                    <div className="flex flex-col w-[60%] m-auto">

                        <OrganizationProfile/>
                    
                    </div>

                </div>

            <Footer/>
        </>
    )
  }