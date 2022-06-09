
import { useState } from 'react'
import Button from '../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Organisation } from '../../../types/types'
import { Toast } from '../toasts/Toast'
import { OrganisationService } from '../../../pages/api/services/OrganizationService'
import { useRouter } from 'next/router'

export function RegisterOrganisation(): JSX.Element {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Organisation>()
  const [{ status, message }, handleToast] = useState({ status: '', message: '' })
  const [loading, handleLoading] = useState<Boolean>(false)
  const router = useRouter()
  const registerOrganisation: SubmitHandler<Organisation> = async(data) => {
   handleLoading(true)
   const organisationService = new OrganisationService()
   try{
   const response = await organisationService.createOrganisation(data)
   if (response.success===false) {
     let errorResponse = response.message?response.message:'Error occured, try again'
     handleToast({ status: 'error', message: errorResponse  })
   } else {
     handleToast({ status: 'success', message: data.name+' is registered successfully' })
     reset(response)
     router.push('/organisations')
   }
   handleLoading(false)
   setTimeout(() => {
     handleToast({ status: '', message: '' })
   }, 3000)


}catch (error) {
  handleToast({ status: 'error', message: 'Error occured, try again'  })
  setTimeout(() => {
    handleToast({ status: '', message: '' })
  }, 3000)
   handleLoading(false)
   
   console.log('Error occured: ',error)
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
        <form onSubmit={handleSubmit(registerOrganisation)} className="text-sm w-full -mt-2">
        <div className="row mt-7 w-full">
        <label htmlFor="email" className="mb-2 text-sm capitalize block">Name</label>
           <input
            type="name"
            id="name"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('name',
         {
           required:"Please enter an organisation name", 
           minLength: {
               value:5,
               message: "must be atleast 5 characters"
           }
        })}
           />

           <span className="text-red-600 text-xs block mt-2">{errors.name?.message}</span>

         </div>


         <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="email" className="mb-2 text-sm capitalize block">Contact Email</label> 
           <input
            type="email"
            id="email"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('contact_email',
         {
           required:"Please enter a valid email", 
         pattern:/\S+@\S+\.\S+/
        })}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.contact_email?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="phone" className="mb-2 text-sm capitalize block">Contact Phone</label> 
          <input
            type="text"
            id="phone"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('contact_phone',
            {
                required: "Please enter an organisation phone"
            })}
           />
           <span className="text-red-600 text-xs block mt-2">{errors.contact_phone?.message }</span>
           </div>

           </div>

           <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="address" className="mb-2 text-sm capitalize block">Address</label> 
          <input
            type="text"
            id="address"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('address',
            {
                required: "Please enter an address"
            })}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.address?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="confirmPassword" className="mb-2 text-sm capitalize block">Type</label> 
           <select  id="type"  className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('type',
            {
                required: "Please select the organisation type"
            })}
           >
             <option value="">----</option>
              <option value="HEAD_OFFICE">HEAD OFFICE</option>
              <option value="SUBSIDIARY">SUBSIDIARY</option>
              <option value="JOINT_VENDOR">JOINT VENDOR</option>
          
           </select>
         <span className="text-red-600 text-xs block mt-2">{errors.type?.message }</span>
           </div>

           </div>
         

           <Button title="Register" loading={loading} loadingTitle="Registering ..." small/>
           </form >
        </div >
    )
}