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

  const registerForm: SubmitHandler<UserRegisterData> = async (data: any) => {
    data.profilePicture = await data.profilePicture[0]
    
    let newUser = new FormData()
    newUser.append('accountType', data.accountType)
    newUser.append('age',data.age)
    newUser.append('dob',data.dob)
    newUser.append('email',data.email)
    newUser.append('gender',data.gender)
    newUser.append('maritialStatus',data.maritialStatus)
    newUser.append('names', data.names)
    newUser.append('nationality', data.nationality)
    newUser.append('password', data.password)
    newUser.append('profilePicture', data.profilePicture)
    
    handleLoading(true);
    const userService = new UserService();
    try {
      const response = await userService.register(newUser);
      console.log('res',response)
      if (response.success === false) {
        handleToast({ status: "error", message: response.message });
      } else {
        console.log('success')
        handleToast({ status: "success", message: response.message });
        // localStorage.setItem(
        //   "access_token",
        //   JSON.stringify(response.data.access_token)
        // );
        navigate("/verifyEmail");
      }
      handleLoading(false);
      setTimeout(() => {
        handleToast({ status: "", message: "" });
      }, 3000);
    } catch (error:any) {
      handleLoading(false);
      console.log("Error occured: ", error.response);
      handleToast({ status: "error", message: "An Error Occured, Try again!"});

    }
  };
  return (
    <div className="my-10 w-full text-sm">
      {/* toast */}
      {status === "error" && <Toast status={status} message={message} />}
      <form onSubmit={handleSubmit(registerForm)} className="pb-[3em]">
        <div className="form-group mt-7 w-full">
          <label htmlFor="names" className="mb-2 text-sm capitalize block">
            Names
          </label>
         <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full px-3 py-2 flex gap-2 items-center rounded">
         <input
            type="text"
            id="names"
            placeholder=""
            className="w-full bg-transparent  focus:outline-none"
            {...register("names", {
              required: "Please enter your Names",
              minLength: 5
            })}
          />
           </div>

          <span className="text-red-600 text-xs block mt-2">
            {errors.names && errors.names.message}
          </span>
        </div>

        <div className="form-group mt-7 w-full">
          <label htmlFor="email" className="mb-2 text-sm capitalize block">
            Email
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
          <label htmlFor="gender" className="mb-2 text-sm capitalize block">
            Gender
          </label>
          {/* <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded"> */}
        
        <select
              id="gender"
              className="rounded bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("gender", {
                required: "Please select your Gender",
              })}
            >
                          <option value={Gender.FEMALE}>Female</option>
                <option value={ Gender.MALE}>Male</option>
                          
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.gender?.message}
            </span>
            {/* </div> */}
              </div>
              
              <div className="form-group mt-7 w-full">
          <label htmlFor="age" className="mb-2 text-sm capitalize block">
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
          <label htmlFor="dob" className="mb-2 text-sm capitalize block">
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
          <label htmlFor="maritialStatus" className="mb-2 text-sm capitalize block">
            Maritial Status
          </label>
        
        <select
              id="maritialStatus"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("maritialStatus", {
                required: "Please select a Maritial Status",
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
          <label htmlFor="nationality" className="mb-2 text-sm capitalize block">
            Nationality
          </label>
        
        <select
              id="nationality"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("nationality", {
                required: "Please select your nationality",
              })}
            >
                          <option value="Rwandan">Rwandan</option>
                <option value="Kenyan">Kenyan</option>
                          
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.nationality?.message}
            </span>
        </div>
        
        <div className="form-group mt-7 w-full">
          <label htmlFor="profilePicture" className="mb-2 text-sm capitalize block">
            Profile Picture
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
          <input
              type="file"
            id="profilePicture"
            className="w-full bg-transparent focus:outline-none"
            {...register("profilePicture", {
              required: "Add Profile Picture",
            })}
            />
            
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.profilePicture && errors.profilePicture.message}
          </span>
        </div>

        <div className="form-group mt-7 w-full">
          <label htmlFor="accountType" className="mb-2 text-sm capitalize block">
            Role
          </label>
        
        <select
              id="role"
              className="rounded-sm bg-gray-50 text-gray-600 ring-1 ring-gray-200 outline-none w-full py-[0.75em] px-3"
              {...register("accountType", {
                required: "Please select the organisation",
              })}
            >
                          <option selected value="user">User</option>
                <option value="admin">Admin</option>
                          
            </select>
            <span className="text-red-600 text-xs block mt-2 w-48">
              {errors.accountType?.message}
            </span>
        </div>
        
        <div className="form-group mt-7 w-full">
          <label htmlFor="password" className="mb-2 text-sm capitalize block">
            Password
          </label>
          <div className="bg-gray-50  ring-1 ring-gray-200 outline-none w-full py-2 px-3 flex gap-2 items-center rounded">
        
        <Lock className="text-gray-500" strokeWidth={0.5}/>
          <input
            type="password"
            id="password"
            className="w-full bg-transparent focus:outline-none"
            {...register("password", {
              required: "Please enter password",
              minLength: 8,
              pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ //min 8 letter password, with at least a symbol, upper and lower case letters and a number
            })}
          />
            </div>
          <span className="text-red-600 block text-xs mt-2">
            {errors.password && errors.password.message}
          </span>
        </div>

        <Button title="Sign Up" loading={loading} loadingTitle="Signing Up ..."/>
      </form>
    </div>
  );
}
