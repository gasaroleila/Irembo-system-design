
import { useForm, SubmitHandler } from "react-hook-form";
import { OtherUserInfo, UserAuth } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext } from "react";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Button from "../authentication/button";
import { checkLocalStorage } from "../../../util/checkLocalStorage";

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
  const currentUser = checkLocalStorage("current_user");

  const updateInfo: SubmitHandler<OtherUserInfo> = async (data) => {
    handleLoading(true);
    const userService = new UserService();

    console.log('document',data.document[0])
    let info = new FormData()
    info.append("documentImage", data.document[0]),
    info.append("documentNumber", data.documentNumber)
    try {
      const response = await userService.addOtherInfo(info, currentUser._id);
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        handleToast({ status: "success", message: response.message });

        setTimeout(async() => {
          
          const response2 = await userService.verifyAccount(currentUser._id)

          if (response2.success) {
            handleToast({ status: "success", message: response2.message })
            
            localStorage.setItem("current_user", JSON.stringify(response2.data))
          }

        }, 3000);
        // window.location.reload()
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
    <div className="my-10">
      <div className="flex  w-3/5 mx-24">
        {/* <div> */}
        <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white mr-4"
            src={currentUser.profilePicture}
            alt="current user"
          />
        {/* </div> */}
        <div className="flex flex-col">
        <h1 className="text-[17px]">Hello, <span className="font-bold">{currentUser.names}</span></h1>
          <p className="text-gray-400">Welcome to ZPlatform</p>
          </div>
      </div>
    <div className="my-10 w-1/5 mx-auto text-sm">
      {/* toast */}
      {status === "error" || status === "success" && <Toast status={status} message={message} />}
      
      <h1>Fill the form to verify your account</h1>
      <form onSubmit={handleSubmit(updateInfo)}>
        <div className="form-group mt-7 w-full">
          <label htmlFor="email" className="mb-2 text-sm capitalize block">
            NID/Passport Number
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
           {/* <Card className="text-gray-500" strokeWidth={0.5}/> */}
         <input
            type="number"
            id="documentNumber"
            placeholder=""
            className="w-full bg-transparent   focus:outline-none"
            {...register("documentNumber", {
              required: "Please enter a valid ID or passport number",
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.documentNumber && errors.documentNumber.message}
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
      </div>
  );
}
