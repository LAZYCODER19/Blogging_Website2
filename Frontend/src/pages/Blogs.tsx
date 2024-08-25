import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"


export const Blogs=()=>{
    const {loading,blogs}=useBlogs()

    if(loading){
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