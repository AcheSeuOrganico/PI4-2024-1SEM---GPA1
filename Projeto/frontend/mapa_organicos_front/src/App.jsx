import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from './pages/Home'
import Login from "./pages/Login";

export default function App(){
  return (
        <Routes> 
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute/>} >
              <Route path="/" element={<Home/>}/>
            </Route >
        </Routes>
  )
}
