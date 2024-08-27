
import { SignupInput } from "@lazycoder19/common_validation"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Auth=({type}:{type:"signup" | "signin"})=>{
    const navigate=useNavigate()
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const [loading, setLoading] = useState<boolean>(false);

    async function sendRequest(){
        try{
            setLoading(true);
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "signup" ? "signup" : "signin"}`,postInputs)
            const jwt=response.data.jwt
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch(e){
            alert("Error while logging in")
        }finally{
            setLoading(false);
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className=" text-slate-500">
                        {type==="signin" ? "Don't have an account" : "Already have an account?"}
                        <Link className=" pl-2 underline" to={type==="signin" ? "/signup" : "/signin"}>{type==="signin"? "sign up" : "sign in"}</Link>
                    </div>
                </div> 
                <div className="pt-8">
                    {type==="signup"? <LabelledInput label="Name" placeholder="Dip Ghosal" onchange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }}></LabelledInput> : null}
                    <LabelledInput label="Username" placeholder="dipghosal@gmail.com" onchange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email:e.target.value
                        })
                    }}></LabelledInput> 
                    <LabelledInput label="Password" type="password" placeholder="123456" onchange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className=" mt-8 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"  disabled={loading}>{loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}</button>
                    {loading && (
                            <div className="flex justify-center mt-4">
                                {/* Simple spinner loader */}
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType{
    label:string,
    placeholder:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void
    type?:string
}

function LabelledInput({label,placeholder,onchange,type}:LabelledInputType){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-4">{label}</label>
            <input onChange={onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}