import Button from "./button";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth, UserVerifyAccount } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext } from "react";
import { UserContext } from "./ContextProvider";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";

export function UserVerifyEmail(): JSX.Element {
  const { authError }: any = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserVerifyAccount>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);

  const navigate = useNavigate();

  const verifyAccount: SubmitHandler<UserVerifyAccount> = async (data) => {
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.verifyEmail(data);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
        
        navigate("/login");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error:any) {
      handleLoading(false);
      console.log("Error occured: ", error);
      handleToast({ status: "error", message: error.message });
    }
  };
  return (
    <div className="my-10 w-full text-sm">
      
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      {/* toast ends here */}
      {/* toast for authentication error */}

      <form onSubmit={handleSubmit(verifyAccount)}>
       
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Verification Code
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="text"
            id="code"
            className="w-full bg-transparent   focus:outline-none"
            {...register("code", {
              required: "Please enter password",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.code && errors.code.message}
          </span>
        </div>

        <Button title="Verify Account" loading={loading} loadingTitle="Verifying Account..." />
      </form>
    </div>
  );
}
