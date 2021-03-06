import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { checkLocalStorage } from "../util/checkLocalStorage"


export default function SignInSignUp(props: any): JSX.Element {
  
    
    const navigate = useNavigate()
 
    return (
        <div
        className = "md:flex w-100 h-screen"
        >
            <div className="md:w-1/2 h-full bg-primary hidden md:block">
                <div className="h-full flex items-center justify-center gap-5">
                    {/* <Image src={Logo} alt="logo" className="w-16 h-16" width="120" height="120" /> */}

                    <div className="rounded p-5 bg-primary text-white border ">Z</div>
                    <h1 className="w-100 text-5xl font-bold text-white">ZPlatform<span className="block text-2xl font-extralight"></span></h1>
                </div>
            </div>
            <div className={`md:w-1/2 h-full ${props.formType === 'register' ? "overflow-y-scroll" : ""}`}>
                <p className="p-10 pl-28 text-small">{`${props.formType === 'register' ? 'Already' : "Don't"} have an account?`}<span className="text-primary px-2 cursor-pointer" onClick={() => navigate(`${props.formType === 'register' ? '/login': '/register'}`)}>{`${props.formType === 'register' ? 'Sign In' : 'Sign Up'}`}</span></p>
                <div className="md:w-3/4 h-3/4  mx-auto p-5 lg:px-10">

                    <div className="title h-10 w-100 ">
                        {/* show header on mobile */}
                        <div className="block md:hidden  my-5">
                            <div className="flex gap-5 items-center">
                            <div className="rounded py-2 px-3 bg-primary text-white border ">Z</div>
                                {/* <Image src={Logo} alt="logo" className="" width="50" height="50" /> */}
                                <h1 className="w-100 text-lg font-bold text-black">ZPlatform</h1>

                            </div>
                        </div>

                        <h3 className="text-xl uppercase mb-2 font-bold">{props.heading}</h3>
                        <h4 className="block text-gray-400 text-md mb-5">{props.sub},</h4>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}