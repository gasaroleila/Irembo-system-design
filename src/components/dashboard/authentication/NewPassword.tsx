import { useEffect, useRef, useState } from 'react'

import Button from './button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { userForgotPassword, userResetPassword } from '../../../types/types'
import { UserService } from '../../../pages/Api/services/UserService'
import { Navigate, useNavigate } from 'react-router'
import { checkLocalStorage } from '../../../util/checkLocalStorage'
import { useParams } from 'react-router'
import { Toast } from "../toasts/Toast";


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
  const [res, setRes] = useState<any>()

  let { userId } = useParams()
  const userService = new UserService();

  const checkCanReset = async () => {
    try {
      const response1 = await userService.getUser(userId)
      if (response1.data.requestPasswordReset) {
         return true
      }

    } catch (err:any) {
      return false
    }
  }

  // useEffect(() => {
  //   checkCanReset()
  // })

  const newPasswordForm: SubmitHandler<userResetPassword> = async (data) => {
    handleLoading(true);

    try {
      const response = await userService.resetPassword(data,userId);
      if (response.success === false) {
        console.log('wrong pass')
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
      console.log(error)
      handleToast({ status: "error", message: error.response.data.message });
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    }
  }

  console.log('res',res)

  if (!checkCanReset) {
    return <Navigate to="/resetPassword" />
  } else {
    return (
      <div>
      {(status === "error" || status === "success") && <Toast status={status} message={message} />}
        <form onSubmit={handleSubmit(newPasswordForm)} className="text-sm pb-14">
        <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-1">
            <label
              htmlFor="oldPassword"
              className="mb-2 text-sm capitalize block"
            >
              Current Password
            </label>
            <input
              type="password"
              id="old_password"
              className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-5"
              {...register("oldPassword", {
                required: "Please enter current password",
              })}
            />

            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.oldPassword?.message}
            </span>
          </div>
          <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-group">
              <label htmlFor="newPassword" className="mb-2 text-sm capitalize block">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                {...register('newPassword',
                {
                  required: "Please enter a new password",
                  minLength: {
                    value: 8,
                    message: "Password should be atleast 8 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password should be atleast 8 letters, a symbol, upper and lower case letters and a number"
                  } //min 8 letter password, with at least a symbol, upper and lower case letters and a number
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