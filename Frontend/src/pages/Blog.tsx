import { Appbar } from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
import { useState , useEffect } from "react"


export const Blog=()=>{
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id || ""
    })
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
    if(!isLoggedIn){
        return <div>
            <div className="text-6xl font-bold flex justify-center mt-2">
                403
            </div>
            <div className="h-0.5 bg-black my-4">

            </div>
            <div className="text-4xl font-semibold flex justify-center">
                Unauthorized Request
            </div>
        </div>
    }
    else if(loading || !blog){
        return <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog}></FullBlog>
    </div>
}