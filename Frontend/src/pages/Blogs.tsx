import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useState,useEffect } from "react"


export const Blogs=()=>{
    const {loading,blogs}=useBlogs()
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
    else if(loading){
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
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div>
                {blogs.map(blog=> <BlogCard
                key={blog.id} 
                id={blog.id}
                authorName={blog.author.name || "Anonymus"}
                title={blog.title}
                content={blog.content}
                publishedDate={"22th August 2024"}>
                </BlogCard>)}
                
            </div>
        </div>
        
        
    </div>
}