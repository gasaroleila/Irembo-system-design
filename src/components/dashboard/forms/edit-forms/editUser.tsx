import { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Organisation, User } from '../../../../types/types'
import { UserService } from '../../../../pages/api/services/UserService'
import { Toast } from '../../toasts/Toast'
import { OrganisationService } from '../../../../pages/api/services/OrganizationService'
import { UserContext } from '../../authentication/ContextProvider'
import Profile from '../files/Profile'
import router from 'next/router'
import { ERole } from '../../../../types/enums'

export function EditUser(props:any): JSX.Element {
   const {user}:any = useContext(UserContext)
   const { register, handleSubmit, formState: { errors }, reset } = useForm<User>()
   const [{ status, message }, handleToast] = useState({ status: '', message: '' })
   const [loading, handleLoading] = useState<Boolean>(false)
   const [organisations, setOrganisations] = useState<Organisation[]>()
   const [userData,setUserData] = useState<any>({})

   const gender = ['MALE','FEMALE']
   const types = [ERole.ADMIN,ERole.CEO,ERole.EMPLOYEE]

   

   useEffect(() => {
      const getOneUser = async(id:string) => {
         try{
         const service = new UserService()
         let user;
         if(props.profile) {
         user = await service.getUser(id, 'user')
         }else {
         user = await service.getUser(id, 'organisation')
         }
         setUserData(user.data)
         }catch(error) {
            console.log(error)
         }
     }

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
        getOneUser(user?.id)
  },[organisations,user?.id,user,props.profile])

   const updateUser: SubmitHandler<User> = async (data) => {
      let newUser = {
         first_name: data.first_name || user?.first_name,
         last_name: data.last_name || user?.last_name,
         national_id: data.national_id || user?.national_id,
         email: data.email || user?.email,
         phone: data.phone || user?.phone,
         address: data.address || user?.address,
         gender: data.gender || user?.gender,
         password: data.password || 'Horizon@123',
         role: data.role || user?.role,
         organisation: data.organisation || user?.organisation?.id
      }

      // console.log('newUser',newUser)
      handleLoading(true)
      const userService = new UserService()
      try {
         let response = await userService.update(user?.org_user_id,newUser)
         
         if (response.success) {
            console.log(response)
            handleToast({ status: 'success', message: response.message })

         } else{
            console.log( response.message)
            let errorResponse = response.message ? response.message : 'Error occured, try again'
            handleToast({ status: 'error', message: errorResponse })
            // router.push('/users')
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
         <Profile/>
         <form onSubmit={handleSubmit(updateUser)} className="text-sm sm:w-full ">
        
            <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
               <div className="form-group">
                  <label htmlFor="firstname" className="mb-2 text-sm capitalize block">FirstName</label>
                  <input
                     type="text"
                     id="firstname"
                     defaultValue={user?.first_name}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('first_name',
                        )}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.first_name?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="lastname" className="mb-2 text-sm capitalize block">LastName</label>
                  <input
                     type="text"
                     id="lastname"
                     defaultValue={user?.last_name}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('last_name',
                        )}
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
                     defaultValue={user?.national_id}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('national_id',
                       )}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.national_id?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="email" className="mb-2 text-sm capitalize block">Email Address</label>
                  <input
                     type="email"
                     id="email"
                     defaultValue={user?.email}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('email',
                        )}
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
                     defaultValue={user?.phone}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('phone',
                      )}
                  />

                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.phone?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="address" className="mb-2 text-sm capitalize block">Address</label>
                  <input
                     type="text"
                     id="address"
                     defaultValue={user?.address}
                     className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('address',
                        )}
                  />


                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.address?.message}</span>

               </div>
               <div className="form-group">
                  <label htmlFor="gender" className="mb-2 text-sm capitalize block">Gender</label>
                  <select id="gender" className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('gender',
                       )}
                  >
                      <option value={user?.gender}>{user?.gender}</option>
                      {
                          gender.map((gender,i)=> {
                              if(gender!== user?.gender) {
                              return (
                              <option key={i} value={gender}>{gender}</option>
                          )}})
                      }
                  </select>
                  <span className="text-red-600 text-xs block mt-2">{errors.gender?.message}</span>
               </div>



               {/* password suggestion */}
               <div className="form-group">
                  <label htmlFor="type" className="mb-2 text-sm capitalize block">user Role</label>
                  <select id="type" required className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                     {...register('role',
                       )}
                  >
                     <option value={user?.role}>{user?.role}</option>
                     {
                        types.map((item,i)=> {
                           if(item!== user?.role) {
                              return (
                              <option key={i} value={item}>{item}</option>
                              )
                           }
                        })
                     }

                  </select>
                  <span className="text-red-600 text-xs block mt-2 w-48">{errors.role?.message}</span>

               </div>

               <div className="form-group">
                  <label htmlFor="organisation" className="mb-2 text-sm capitalize block">Organisation</label>
                  <select id="organisation" className="rounded-sm text-gray-600 bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
                   {...register('organisation',
                  )}
                  >
                     <option value={user?.organisation?.id}>{user?.organisation?.name}</option>
                     {organisations?.map((item:Organisation,i:number)=>{
                        if(item.id !== user?.organisation?.id) {
                           return(
                              <option value={item.id} key={i}>{item.name}</option>
                           )
                        }
                     })}
                  </select>
                  {/* <span className="text-red-600 text-xs block mt-2 w-48">{errors.organisation?.message}</span> */}
                     
                   
               </div>

            </div>



            <Button title="Update" loading={loading} loadingTitle="Updating..." small />
         </form>
      </div>
   )
}