import { useRef, useState } from 'react'

import Button from './button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { userForgotPassword, userResetPassword } from '../../../types/types'
import { UserService } from '../../../pages/Api/services/UserService'
import { Navigate, useNavigate } from 'react-router'
import { checkLocalStorage } from '../../../util/checkLocalStorage'
import { useParams } from 'react-router'

export function UserNewPassword(): JSX.Element {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<userResetPassword>()
  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");
  const [loading, handleLoading] = useState<Boolean>(false);
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });

  let { userId } = useParams()
  const currentUser = checkLocalStorage("current_user")


  const newPasswordForm: SubmitHandler<userResetPassword> = async (data) => {
    handleLoading(true);
    console.log(loading)
    const userService = new UserService();

    try {
      console.log('there',userId)
      const response = await userService.resetPassword(data,userId);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
        localStorage.setItem("current_user", JSON.stringify(response.data))
        navigate("/login");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error:any) {
      handleLoading(false);
      handleToast({ status: "error", message: error.message });
    }
  }

  console.log("reset", currentUser.requestPasswordReset)
  if (!currentUser.requestPasswordReset) {
    return <Navigate to="/resetPassword" />
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit(newPasswordForm)} className="text-sm pb-14">

          <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-group">
              <label htmlFor="newPassword" className="mb-2 text-sm capitalize block">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register('newPassword',
                  {
                    required: "Please enter a new password of atleast 8 characters",
                    minLength: {
                      value: 8,
                      message: "must be 8 characters"
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
                className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register('confirmPassword',
                  {
                    required: "Please confirm password",
                    validate: value =>
                      String(value) === String(newPassword.current) || "The passwords do not match"
                  })}
              />
              <span className="text-red-600 text-xs block mt-2">
                {
                  errors.confirmPassword?.message
                  && <span className="text-red-600 text-xs block mt-2">{errors.confirmPassword.message}</span>
                }</span>
            </div>

          </div>
         

          <Button title="reset password" loading={loading} loadingTitle="Resetting password ..." />
        </form>
      </div >
    )
  }
}