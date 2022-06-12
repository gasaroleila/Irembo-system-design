import Button from "./button";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserAuth, userLogin } from "../../../types/types";
import { Toast } from "../toasts/Toast";
import { UserService } from "../../../pages/Api/services/UserService";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./ContextProvider";
import { Lock, Mail } from "react-feather";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { checkLocalStorage } from "../../../util/checkLocalStorage";
import { useParams } from "react-router";

export function ResetPasswordRedirect(): JSX.Element {
  const { authError }: any = useContext(UserContext);
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
        const response = await userService.checkResetLink(code, userId);
        console.log('res',response.status)
        if (response.status == 200) {
            navigate(`/resetPassword/${userId}`)
        }
        // else {
        //     navigate('/login')
        // }
    }
    useEffect(() => {
        handleRedirect()

    })

  return (
    <div className="my-10 w-full text-sm">
      <p className="px-12">redirecting ...</p>
     
    </div>
  );
}
