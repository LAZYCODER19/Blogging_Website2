import { Hono } from "hono";


export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>()

blogRouter.post("/",async(c)=>{

})

blogRouter.put("/",async(c)=>{
    
})

blogRouter.get("/",async(c)=>{
    
})

blogRouter.get("/bulk",async(c)=>{
    
})