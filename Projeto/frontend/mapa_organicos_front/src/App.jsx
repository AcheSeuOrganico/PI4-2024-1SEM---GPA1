import { Route, Routes } from "react-router-dom";

import {
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home'
import Login from "./pages/Login";

export default function App(){
  return (
        <Routes> 
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" > */}
                <Route path="/" element={<Home/>} />
            {/* </Route > */}
        </Routes>
  )
}
