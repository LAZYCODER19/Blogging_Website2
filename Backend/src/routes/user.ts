import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { SignupInput,signinInput, signupInput } from "@lazycoder19/common_validation";


export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

userRouter.post("/signup",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({Error:"Invalid inputs"})
    }
    try{
        const user=await prisma.user.create({
            data:{
                email:body.email,
                password:body.password
            }
        })
        const jwt=await sign({id:user.id},c.env.JWT_SECRET);
        return c.json({jwt});
    }catch(e){
        c.status(403);
        return c.json({Error:"Error while signing up"})
    }
})

userRouter.post("/signin",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({Error:"Invalid inputs"})
    }
    const user=await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
        c.status(403);
        return c.json({
            Error:"User not found"
        })
    }

    const jwt=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt});
})

