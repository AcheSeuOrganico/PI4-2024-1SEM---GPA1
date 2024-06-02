import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Organization from "./pages/Organizations";

export default function App(){
  return (
        <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute/>} >
              <Route path="/" element={<Home/>}/>
              <Route path="/organizations/:id" element={<Organization/>}/>
            </Route >
        </Routes>
  )
}
