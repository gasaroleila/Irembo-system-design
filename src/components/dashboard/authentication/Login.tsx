import Button from "./button";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext } from "react";
import { UserContext } from "./ContextProvider";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";

export function UserLogin(): JSX.Element {
  const { authError }: any = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuth>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);

  const navigate = useNavigate();

  const login: SubmitHandler<UserAuth> = async (data) => {
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.sendLoginLink(data);
      console.log(response)
      if (response.success === false) {
        // handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
        // localStorage.setItem(
        //   "access_token",
        //   JSON.stringify(response.token)
        // );
        // localStorage.setItem(
        //   "current_user",
        //   JSON.stringify(response.user)
        // );
        // navigate("/loginWithLink");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error:any) {
      handleLoading(false);
      console.log(error)
      handleToast({ status: "error", message: error.response.data});
    }
  };
  return (
    <div className="my-10 w-full text-sm">
      
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      {/* toast ends here */}
      {/* toast for authentication error */}

      {/* {authError !== '' &&
        <Toast
          status= 'error'
          message={authError}
        />
      }
       */}
      <form onSubmit={handleSubmit(login)}>
        <div className="form-group mt-7 w-full">
          <label htmlFor="email" className="mb-2 text-sm capitalize block">
            email address
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
           <Mail className="text-gray-500" strokeWidth={0.5}/>
         <input
            type="text"
            id="email"
            placeholder=""
            className="w-full bg-transparent   focus:outline-none"
            {...register("email", {
              required: "Please enter a valid email",
              pattern: /\S+@\S+\.\S+/,
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            password
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
        <Lock className="text-gray-500" strokeWidth={0.5}/>
          <input
            type="password"
            id="password"
            className="w-full bg-transparent   focus:outline-none"
            {...register("password", {
              required: "Please enter password",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.password && errors.password.message}
          </span>
        </div>
        <Link to="/resetpassword">
          <a className="text-gray-500 hover:underline float-right my-5 text-sm">
            Forgot password?
          </a>
        </Link>

        <Button title="Sign in"   />
      </form>
    </div>
  );
}
