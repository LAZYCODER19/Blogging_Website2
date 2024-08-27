import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useState ,useEffect } from "react";
import { Logout } from "./Logout";


export const Appbar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex justify-center flex-col">
            Blogger
        </Link>
        <div>
            {isLoggedIn ? <Logout></Logout> : <span></span>}
            <Link to={'/publish'}>
                 <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar size={"big"} name="Dip"></Avatar>
        </div>
    </div>
}