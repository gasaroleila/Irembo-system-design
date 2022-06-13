import { useRef, useState } from 'react'

import Button from './button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { userForgotPassword, userResetPassword } from '../../../types/types'
import { UserService } from '../../../pages/Api/services/UserService'
import { useNavigate } from 'react-router'
import { Toast } from "../toasts/Toast";


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
      const response = await userService.sendResetLink(data);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error: any) {
      console.log(error)
      handleLoading(false);
      handleToast({ status: "error", message: error.response.data.message });
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    }
  }
  return (
    <div>
        {/* toast */}
        {(status === "error" || status === "success") && <Toast status={status} message={message} />}
      {/* toast ends here */}
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

         

           <Button title="Send Reset Code" loading={loading} loadingTitle="Send Reset Code..."/>
           </form >
        </div >
    )
}