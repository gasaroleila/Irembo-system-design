
import Button from './button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { userForgotPassword}  from '../../../types/types'
import { Link } from 'react-router-dom'

export function UserForgotPassword():JSX.Element{
    const {register, handleSubmit,formState:{errors}} = useForm<userForgotPassword>()
    const forgotPassword:SubmitHandler<userForgotPassword> = data=> {
     console.log(data)
       }
    return(
        <div className="w-full my-10">
        <form onSubmit={handleSubmit(forgotPassword)} className="text-sm">
        <div className="row mt-7 w-full">
        <label htmlFor="email" className="mb-2 text-sm capitalize block">email address</label>
           <input
            type="email"
            id="email"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('email',
         {
           required:"Please enter a valid email", 
         pattern:/\S+@\S+\.\S+/
        })}
           />

    <span className="text-red-600 text-xs block mt-2">{errors.email&& errors.email.message}</span>
        </div>

          <div className="row float-right mt-2">
          <Link to="/login">
          <a className="text-gray-500 hover:underline text-sm">Remember your password?</a>
          </Link>
           </div>

         <Link to="user/resetpassword">
           <Button title="send verification code"/>
           </Link>
           </form>
        </div>
    )
}