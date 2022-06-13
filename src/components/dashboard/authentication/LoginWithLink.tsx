import Button from "./button";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth, userLogin } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext, useEffect } from "react";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import { useParams } from "react-router";

export function UserLoginWithLink(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);

    const navigate = useNavigate();
    let { code, userId } = useParams()
    
    
    
    const handleRedirect = async () => {
        //   const currentUser = checkLocalStorage("current_user");
        const userService = new UserService();
        const response = await userService.login(code, userId);
        if (response.status == 200) {
            localStorage.setItem(
                  "access_token",
                  JSON.stringify(response.token)
            );
            
            localStorage.setItem(
                "current_user",
                JSON.stringify(response.data)
            )
            navigate('/')
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        handleRedirect()

    })

//   const loginWithLink: SubmitHandler<userLogin> = async (data) => {
//     handleLoading(true);
//       const currentUser = checkLocalStorage("current_user");
//     try {
//       if (response.success === false) {
//         handleToast({ status: "error", message: response.message });
//       } else {
//         handleToast({ status: "success", message: response.message });
//         localStorage.setItem(
//           "access_token",
//           JSON.stringify(response.token)
//         );
//         localStorage.setItem(
//           "current_user",
//           JSON.stringify(response.data)
//         );
//         navigate("/");
//       }
//       handleLoading(false);
//       setTimeout(() => {
//         handleToast({ status: "", message: "" });
//       }, 3000);
//     } catch (error:any) {
//       handleLoading(false);
//       handleToast({ status: "error", message: error.message });
//       console.log("Error occured: ", error.message.message);
//     }
//   };
  return (
    <div className="my-10 w-full text-sm">
      <p className="px-12">redirecting ...</p>
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      {/* toast ends here */}
      {/* toast for authentication error */}

      {/* <form onSubmit={handleSubmit(loginWithLink)}>
        <div className="form-group mt-7 w-full">
          <label htmlFor="loginLink" className="mb-2 text-sm capitalize block">
            Login Link
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
         <input
            type="text"
            id="loginLink"
            placeholder=""
            className="w-full bg-transparent   focus:outline-none"
            {...register("loginLink", {
              required: "Please enter a valid email",
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.loginLink && errors.loginLink.message}
          </span>
        </div>

        <Button title="Login" loading={loading} loadingTitle="Logging In ..." />
      </form> */}
    </div>
  );
}
