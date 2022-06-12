/* eslint-disable @next/next/no-img-element */
import { UserLogin } from '../components/dashboard/authentication/Login'
import { UserNewPassword } from '../components/dashboard/authentication/NewPassword'
import { UserResetPassword } from '../components/dashboard/authentication/ResetPassword'
import ResetPasswordLayout from '../layouts/ResetPassword'
import SignInSignUp from '../layouts/SignIn'

export default function ResetPasswordWithLink():JSX.Element{
    return(
        
        <ResetPasswordLayout  heading="reset password" sub="Enter Email to Reset Password">

            <div className="mt-24">
              <UserNewPassword/>
           </div>
        </ResetPasswordLayout>
    )
}