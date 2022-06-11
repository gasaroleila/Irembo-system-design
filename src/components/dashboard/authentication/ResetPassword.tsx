import { useRef, useState } from 'react'

import Button from './button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { userForgotPassword, userResetPassword } from '../../../types/types'
import { UserService } from '../../../pages/Api/services/UserService'
import { useNavigate } from 'react-router'

export function UserResetPassword(): JSX.Element {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<userForgotPassword>()
  const newPassword = useRef({});
  // newPassword.current = watch("newPassword", "");
  const [loading, handleLoading] = useState<Boolean>(false);
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });

  const resetPassword: SubmitHandler<userForgotPassword> = async(data) => {
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.sendResetCode(data);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.token)
        );
        
        navigate("/login");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error:any) {
      handleLoading(false);
      handleToast({ status: "error", message: error.message });
      console.log("Error occured: ", error.message.message);
    }
  }
  return (
        <div>
        <form onSubmit={handleSubmit(resetPassword)} className="text-sm pb-14">
        <div className="row mt-7 w-full">
        <label htmlFor="email" className="mb-2 text-sm capitalize block">email address</label>
           <input
            type="email"
            id="email"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('email',
         {
           required:"Please enter a valid email", 
         pattern:/\S+@\S+\.\S+/
        })}
           />

           <span className="text-red-600 text-xs block mt-2">{errors.email?.message}</span>

         </div>


         {/* <div className="row mt-7 w-full">
         <label htmlFor="email" className="mb-2 text-sm capitalize block">Activation Code</label>
          <input
            type="number"
            id="code"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {
              ...register('code',
              {
                  required: 'Please enter a valid code'
              })
            }
           />

        <span className="text-red-600 text-xs block mt-2">{errors.code?.message}</span>

           </div>

           <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="newPassword" className="mb-2 text-sm capitalize block">New Password</label> 
          <input
            type="password"
            id="newPassword"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('newPassword',
            {
                required: "Please enter a new password of atleast 6 characters",
                minLength: {
                    value: 6,
                    message: "must be 6 characters"
                }
            })}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.newPassword?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="confirmPassword" className="mb-2 text-sm capitalize block">Confirm Password</label> 
        <input
            type="password"
            id="confirmPassword"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('confirmPassword',
            {
                required: "Please confirm password",
                validate: value=> 
                   String(value) === String(newPassword.current) || "The passwords do not match"
            })}
           />
        <span className="text-red-600 text-xs block mt-2">
            {
            errors.confirmPassword?.message 
            && <span className="text-red-600 text-xs block mt-2">Passwords do not match</span>
            }</span>
           </div>

           </div> */}
         

           <Button title="reset password"/>
           </form >
        </div >
    )
}