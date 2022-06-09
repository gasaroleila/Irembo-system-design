import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Organisation, OrganisationUser, User } from '../../../types/types'
import { UserService } from '../../../pages/api/services/UserService'
import { Toast } from '../toasts/Toast'
import { OrganisationService } from '../../../pages/api/services/OrganizationService'
import { UserContext } from "../authentication/ContextProvider";


export function RegisterUser(): JSX.Element {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<User>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [organisations, setOrganisations] = useState<Organisation[]>()
   const { user }: OrganisationUser = useContext(UserContext);
   const router = useRouter()

   console.log(user?.id)
   useEffect(() => {
        const loadOrganisations = async () => {
           const organisationService = new OrganisationService()
           try{
           const response = await organisationService.getAll(1,30)
           setOrganisations(response.data.data)
         }catch (error) {
           console.log('Error occured: ',error)
        }
        
         }
         
        loadOrganisations()
  },[organisations])


   const registerUser: SubmitHandler<User> = async (data) => {
      handleLoading(true)
      const userService = new UserService()
      try {
         const response = await userService.create(data)
         if (response.success === false) {
            let errorResponse = response.message ? response.message : 'Error occured, try again'
            handleToast({ status: 'error', message: errorResponse })
         } else {
            handleToast({ status: 'success', message: data.first_name + ' is registered successfully' })
            reset(response)
            router.push('/users')
         }
         handleLoading(false)
         setTimeout(() => {
            handleToast({ status: '', message: '' })
         }, 3000)


      } catch (error: any) {
         handleToast({ status: 'error', message: error.response.data.message ? error.response.data.message : 'Error occured, try again' })
         setTimeout(() => {
            handleToast({ status: '', message: '' })
         }, 3000)
         handleLoading(false)

      }
   }
   return (
      <div className="w-full">
         {/* toast */}
         {status &&
            <Toast
               status={status}
               message={message}
            />
         }
         {/* toast ends here */}
         <form onSubmit={handleSubmit(registerUser)} className="text-sm sm:w-full ">
          
            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               <div className="form-group">
                  <label htmlFor="firstname" className="mb-2 text-sm capitalize block">FirstName</label>
                  <input
                     type="text"
                     id="firstname"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('first_name',
                        {
                           required: "Please enter a firstname"
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.first_name?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="lastname" className="mb-2 text-sm capitalize block">LastName</label>
                  <input
                     type="text"
                     id="lastname"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('last_name',
                        {
                           required: "Please enter a lastname"
                        })}
                  />
                  <span className="text-red-600 text-xs block mt-2">{errors.last_name?.message}</span>
               </div>

            </div>

            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               <div className="form-group">
                  <label htmlFor="nationaId" className="mb-2 text-sm capitalize block">National Id</label>
                  <input
                     type="number"
                     id="nationaId"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('national_id',
                        {
                           required: "Please enter a national Id",
                           minLength: {
                              value: 16,
                              message: 'Please enter 16 digits'
                           },
                           maxLength: {
                              value: 16,
                              message: 'Please enter 16 digits'
                           }
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.national_id?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="email" className="mb-2 text-sm capitalize block">Email Address</label>
                  <input
                     type="email"
                     id="email"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('email',
                        {
                           required: "Please enter a valid email",
                           pattern: /\S+@\S+\.\S+/
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.email?.message}</span>

               </div>

            </div>

            <div className=" mt-7 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5">

               <div className="form-group">
                  <label htmlFor="phone" className="mb-2 text-sm capitalize block">Phone number</label>
                  <input
                     type="number"
                     id="phone"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('phone',
                        {
                           required: "Please enter a phone number",
                           minLength: {
                              value: 10,
                              message: 'Please enter 10 digits'
                           },
                           maxLength: {
                              value: 10,
                              message: 'Please enter 10 digits'
                           }
                        })}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.phone?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="address" className="mb-2 text-sm capitalize block">Address</label>
                  <input
                     type="text"
                     id="address"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('address',
                        {
                           required: "Please enter an address"
                        })}
                  />


                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.address?.message}</span>

               </div>
               <div className="form-group">
                  <label htmlFor="gender" className="mb-2 text-sm capitalize block">Gender</label>
                  <select id="gender" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('gender',
                        {
                           required: "Please select gender"
                        })}
                  >
                     <option value="">Choose Gender</option>
                     <option value="MALE">Male</option>
                     <option value="FEMALE">Female</option>
                  </select>
                  <span className="text-red-600 text-xs block mt-2">{errors.gender?.message}</span>
               </div>



               {/* password suggestion */}
               <div className="form-group">
                  <label htmlFor="type" className="mb-2 text-sm capitalize block">User Role</label>
                  <select id="type" required className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('role',
                        {
                           required: "Please choose the user role"
                        })}
                  >
                     <option value="">-----</option>
                     <option value="ADMIN">ADMIN</option>
                     <option value="CEO">CEO</option>
                     <option value="EMPLOYEE">EMPLOYEE</option>

                  </select>
                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.role?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="organisation" className="mb-2 text-sm capitalize block">Organisation</label>
                  {
                     user?.role === 'SUPER_ADMIN' ? (
                        <select id="organisation" className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('organisation',
                   {
                      required: "Please select the organisation"
                   })}
                  >
                     <option value="">----</option>
                     {organisations?.map((item:Organisation,i:number)=>{
                        return(
                           <option value={item.id} key={i}>{item.name}</option>
                        )
                     })}
                  </select>
                     ) : 
                     
                        (
                           <input id="organisation"
                           className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                           value={user?.organisation?.name}
                           disabled
                         {...register('organisation',
                         {
                            required: "Please select the organisation"
                         })}
                        />
                        )
                  }
                 
                  {/* <span className="text-red-600 text-xs block mt-2 w-48">{errors.organisation?.message}</span> */}
                     
                   
               </div>

               <div className="form-group">
                  <label htmlFor="password" className="mb-2 text-sm capitalize block">Password </label>
                  <input
                     type="text"
                     id="password"
                     defaultValue="Horizon@123"
                     className="rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('password',
                        {
                           required: "Please enter password",
                           pattern: {
                              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                              message: "Password should contain 8 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter "
                           }

                        })}
                  />


                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.password?.message}</span>
                  <sub className="text-gray-500">This password can be changed</sub>
               </div>
            </div>



            <Button title="Register" loading={loading} loadingTitle="Registering ..." small />
         </form>
      </div>
   )
}