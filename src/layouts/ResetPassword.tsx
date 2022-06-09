import { useContext, useEffect, useState } from "react"
import { ArrowDownLeft, ArrowLeft } from "react-feather"
import { Navigate, useNavigate } from "react-router"
import { UserContext } from "../components/dashboard/authentication/ContextProvider"
import { checkLocalStorage } from "../util/checkLocalStorage"


export default function ResetPasswordLayout(props: any): JSX.Element {
    const {mode}:any = useContext(UserContext)
    // setting the theme
  const [dark,setDark] = useState(false)
  useEffect(() => {
   let darkmode:any = checkLocalStorage("darkmode")
   setDark(darkmode)
  }, [mode])
    
    const navigate = useNavigate()
 
    return (
        <div
        className = {`${dark?'darkMode':''} md:flex w-100 h-screen`}
        >
            <div className="md:w-1/2 h-full bg-primary hidden md:block">
                <div className="h-full flex items-center justify-center gap-5">
                    {/* <Image src={Logo} alt="logo" className="w-16 h-16" width="120" height="120" /> */}

                    <div className="rounded p-5 bg-primary text-white border ">Z</div>
                    <h1 className="w-100 text-5xl font-bold text-white">CompanyZ <span className="block text-2xl font-extralight"></span></h1>
                </div>
            </div>
            <div className={`md:w-1/2 h-full overflow-y-scroll`}>
                <div onClick={() => navigate('/login')}>
                    <ArrowLeft className="font-extrabold my-5 mx-10 cursor-pointer" strokeWidth={1} />
                    </div>
                <div className="md:w-3/4 h-3/4 mt-20  mx-auto p-5 lg:px-10">
                    <div className="title h-10 w-100">
                        {/* show header on mobile */}
                        <div className="block md:hidden  my-5">
                            <div className="flex gap-5 items-center">
                            <div className="rounded py-2 px-3 bg-primary text-white border ">Z</div>
                                {/* <Image src={Logo} alt="logo" className="" width="50" height="50" /> */}
                                <h1 className="w-100 text-lg font-bold text-black">CompanyZ</h1>

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