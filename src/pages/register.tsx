/* eslint-disable @next/next/no-img-element */
import { UserLogin } from '../components/dashboard/authentication/Login'
import { UserRegister } from '../components/dashboard/authentication/Register'
import SignInSignUp from '../layouts/SignIn'

export default function Register():JSX.Element{
    return(
        
        <SignInSignUp formType="register" heading="sign up" sub="Register to CompanyZ">
            <div className="mt-24">
              <UserRegister/>
           </div>
        </SignInSignUp>
    )
}