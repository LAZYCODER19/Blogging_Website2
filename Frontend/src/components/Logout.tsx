import { useNavigate } from "react-router-dom"


export const Logout=()=>{
    const navigate=useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/signin")
    }
    
    return<button onClick={handleLogout} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>

}


