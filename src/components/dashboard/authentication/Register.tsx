import Button from "./button";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth, UserRegisterData } from "../../../types/types";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext } from "react";
import { UserContext } from "./ContextProvider";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Gender, MaritialStatus } from "../../../types/enums";
import { Toast } from "../toasts/Toast";

export function UserRegister(): JSX.Element {
  const { authError }: any = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>();
  const [{ status, message }, handleToast] = useState({
    status: "",
    message: "",
  });
  const [loading, handleLoading] = useState<Boolean>(false);

  const navigate = useNavigate();

  const login: SubmitHandler<UserRegisterData> = async (data) => {
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.register(data);
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
    <div className="my-10 w-full text-sm">
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      <form onSubmit={handleSubmit(login)} className="pb-[3em]">
        <div className="form-group mt-7 w-full">
          <label htmlFor="email" className="mb-2 text-sm capitalize block">
            Firstname
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
         <input
            type="text"
            id="fname"
            placeholder=""
            className="w-full bg-transparent  focus:outline-none"
            {...register("fname", {
              required: "Please enter your Firstname",
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.fname && errors.fname.message}
          </span>
        </div>
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Lastname
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="text"
            id="lname"
            className="w-full bg-transparent   focus:outline-none"
            {...register("lname", {
              required: "Please enter your Lastname",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.lname && errors.lname.message}
          </span>
              </div>
              
              <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Gender
          </label>
          {/* <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded"> */}
        
        <select
              id="gender"
              className="rounded bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("gender", {
                required: "Please select the organisation",
              })}
            >
                          <option selected value={Gender.FEMALE}>Female</option>
                <option value={ Gender.MALE}>Male</option>
                          
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.gender?.message}
            </span>
            {/* </div> */}
              </div>
              
              <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Age
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="number"
            id="age"
            className="w-full bg-transparent   focus:outline-none"
            {...register("age", {
              required: "Please enter your age",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.age && errors.age.message}
          </span>
              </div>

              <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Date Of Birth
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="date"
            id="dob"
            className="w-full bg-transparent   focus:outline-none"
            {...register("dob", {
              required: "Please enter your Lastname",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.dob && errors.dob.message}
          </span>
              </div>

              <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Maritial Status
          </label>
        
        <select
              id="gender"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("gender", {
                required: "Please select the organisation",
              })}
            >
                          <option  value={MaritialStatus.SINGLE}>{MaritialStatus.SINGLE}</option>
                          <option selected value={MaritialStatus.DIVORCED}>{MaritialStatus.DIVORCED}</option>
                          <option value={MaritialStatus.MARRIED}>{MaritialStatus.MARRIED}</option>
                          <option value={MaritialStatus.WIDOWED}>{MaritialStatus.WIDOWED}</option>
            </select> 
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.gender?.message}
            </span>
              </div>

              <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Nationality
          </label>
        
        <select
              id="gender"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("nationality", {
                required: "Please select the organisation",
              })}
            >
                          <option selected value="">Rwandan</option>
                <option value="">Kenyan</option>
                          
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.nationality?.message}
            </span>
        </div>
        
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Profile Photo
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
          <input
            type="file"
            id="profile"
            className="w-full bg-transparent   focus:outline-none"
            {...register("profile", {
              required: "Please enter your Lastname",
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.profile && errors.profile.message}
          </span>
              </div>

        <Button title="Sign in" loading={loading} loadingTitle="Signing ..."/>
      </form>
    </div>
  );
}
