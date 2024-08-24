import { useBlog } from "../hooks"



export const Blog=()=>{
    const {loading,blog}=useBlog()
    if(loading){
        <div>
            loading...
        </div>
    }
}