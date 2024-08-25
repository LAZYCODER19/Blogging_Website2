import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"


export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
            <Appbar></Appbar>
            <div className=" flex justify-center">
                <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
                    <div className=" col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className=" text-slate-500 pt-2">
                            post on 25th August 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className=" col-span-4">
                        <div className="text-slate-600 text-lg"> 
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymus"}></Avatar>
                            </div>
                            <div>
                                <div className=" font-bold text-xl">
                                    {blog.author.name || "Anonymos"}
                                </div>
                                <div className="pt-2 text-slate-400">
                                Random catch phrase about the author's abilty to grab the   user's attension
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
    </div>
}