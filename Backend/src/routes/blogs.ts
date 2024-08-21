import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, CreateBlogInput,updateBlogInput } from "@lazycoder19/common_validation";



export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

blogRouter.use("/*",async(c,next)=>{
    const auth=c.req.header("Authorization");
    if(!auth){
        c.status(403);
        return c.json({Error:"Unauthorized"})
    }
    const payload=await verify(auth,c.env.JWT_SECRET);
    if(!payload){
        c.status(403);
        return c.json({Error:"Unauthorized"});
    }
    c.set('userId',payload.id as string); 
    await next();
})

blogRouter.post("/post",async(c)=>{
    const userId=c.get('userId')
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({Error:"Invalid inputs"})
    }
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })
    return c.json({id:post.id})
})

blogRouter.put("/update",async(c)=>{
    const userId=c.get('userId')
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({Error:"Invalid inputs"})
    }
    const post=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({msg:"updated succesfully"})
    
})

blogRouter.get("/bulk",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts=await prisma.post.findMany({})

    return c.json({posts})
})

blogRouter.get("/:id",async(c)=>{
    const id=c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post=await prisma.post.findUnique({
        where:{
            id
        }
    })
    return c.json({post})
})

