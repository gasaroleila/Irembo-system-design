import { useContext, useRef, useState } from "react";

// import Button from './authentication/button'

import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordChangeProps } from "../../types/types";
import { Toast } from "./toasts/Toast";
import Button from "./authentication/button";
import { UserService } from "../../pages/Api/services/UserService";
import { UserContext } from "./authentication/ContextProvider";


export function ChangePassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordChangeProps>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);
  const {user}:any = useContext(UserContext)

  const changePassword: SubmitHandler<PasswordChangeProps> = async (
    data: PasswordChangeProps
  ) => {
    const service = new UserService()
    try {
      if (data.new_password != data.confirm_password) {
        handleToast({ status: "error", message: "Passwords don't match" });
      } else {
        await service.updatePassword(user?.id, { old_password: data.old_password, new_password: data.new_password })
          handleToast({
            status: "success",
            message: "Password changed successfully",
          });
        reset()
        setTimeout(() => {
          handleToast({ status: "", message: "" });
        }, 3000);
      }

    } catch (error:any) { 
      handleToast({ status: "error", message: "Invalid password" }); 
    }
    handleLoading(false);
  };
  
  return (
    <div className="w-full">
      {/* toast */}
      {status && <Toast status={status} message={message} />}
      {/* toast ends here */}

      <form onSubmit={handleSubmit(changePassword)} className="text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-1">
            <label
              htmlFor="old_password"
              className="mb-2 text-sm capitalize block"
            >
              Current Password
            </label>
            <input
              type="password"
              id="old_password"
              className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-5"
              {...register("old_password", {
                required: "Please enter current password",
              })}
            />

            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.old_password?.message}
            </span>
          </div>

          <div className=" mt-3 w-full grid grid-cols-1 lg:grid-cols-1">
            <label
              htmlFor="new_password"
              className="mb-2 text-sm capitalize block"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-5"
              {...register("new_password", {
                required: "Please enter a new password",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters",
                },
              })}
            />

            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.new_password?.message}
            </span>
          </div>

          <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-1">
            <label
              htmlFor="confirm_password"
              className="mb-2 text-sm capitalize block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-5"
              {...register("confirm_password", {
                required: "Please confirm password",
              })}
            />
            <span className="text-red-600 text-xs block mt-2">
              {errors.confirm_password?.message && (
                <span className="text-red-600 text-xs block mt-2">
                  {errors.confirm_password?.message}
                </span>
              )}
            </span>
          </div>
        </div>

        <Button
          title="Change password"
          loading={loading}
          loadingTitle="Changing ..."
          small
        />
      </form>
    </div>
  );
}
