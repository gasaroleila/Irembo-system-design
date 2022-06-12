/* eslint-disable @next/next/no-img-element */
import { UserLogin } from '../components/dashboard/authentication/Login'
import { UserVerifyEmail } from '../components/dashboard/authentication/VerifyEmail'
import SignInSignUp from '../layouts/SignIn'

export default function VerifyEmail():JSX.Element{
    return(
        
        <SignInSignUp formType="register" heading="Verify Email" sub="Input Code to verify your Email">
            <div className="mt-24">
              <UserVerifyEmail/>
           </div>
        </SignInSignUp>
    )
}