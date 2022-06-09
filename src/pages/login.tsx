/* eslint-disable @next/next/no-img-element */
import { UserLogin } from '../components/dashboard/authentication/Login'
import SignInSignUp from '../layouts/SignIn'

export default function Login():JSX.Element{
    return(
        
        <SignInSignUp formType="login" heading="sign in" sub="Welcome back">

            <div className="mt-24">
              <UserLogin/>
           </div>
        </SignInSignUp>
    )
}