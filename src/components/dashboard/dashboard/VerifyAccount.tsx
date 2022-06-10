
import { useForm, SubmitHandler } from "react-hook-form";
import { OtherUserInfo, UserAuth } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext } from "react";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Button from "../authentication/button";

export default function VerifyAccount(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtherUserInfo>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);

  const navigate = useNavigate();

  const login: SubmitHandler<OtherUserInfo> = async (data) => {
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.addOtherInfo(data, "");
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        navigate("/");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error) {
      handleLoading(false);
      console.log("Error occured: ", error);
    }
  };
  return (
    <div className="my-10 w-1/5 mx-auto text-sm">
      
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      <form onSubmit={handleSubmit(login)}>
        <div className="form-group mt-7 w-full">
          <label htmlFor="email" className="mb-2 text-sm capitalize block">
            NID/Passport Number
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
           {/* <Card className="text-gray-500" strokeWidth={0.5}/> */}
         <input
            type="number"
            id="ID"
            placeholder=""
            className="w-full bg-transparent   focus:outline-none"
            {...register("ID", {
              required: "Please enter a valid ID or passport number",
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.ID && errors.ID.message}
          </span>
        </div>
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Official Document
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="file"
            id="document"
            className="w-full bg-transparent   focus:outline-none"
            {...register("document", {
              required: "Please enter password",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.document && errors.document.message}
          </span>
        </div>

        <Button title="Submit" loading={loading} loadingTitle="Submitting..." />
      </form>
    </div>
  );
}
