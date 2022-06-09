/* eslint-disable @next/next/no-img-element */
import { UserLogin } from '../components/dashboard/authentication/Login'
import { UserResetPassword } from '../components/dashboard/authentication/ResetPassword'
import ResetPasswordLayout from '../layouts/ResetPassword'
import SignInSignUp from '../layouts/SignIn'

export default function ResetPassword():JSX.Element{
    return(
        
        <ResetPasswordLayout  heading="reset password" sub="Enter Email to Reset Password">

            <div className="mt-24">
              <UserResetPassword/>
           </div>
        </ResetPasswordLayout>
    )
}