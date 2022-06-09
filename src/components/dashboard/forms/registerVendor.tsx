import Button from '../authentication/button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Vendor } from '../../../types/types'
import { useState } from 'react'
import { VendorService } from '../../../pages/api/services/VendorService'
import { Toast } from '../toasts/Toast'
import router from 'next/router'
export function RegisterVendor(): JSX.Element {
  const { register, handleSubmit, formState: { errors },reset } = useForm<Vendor>()
  const [{ status, message }, handleToast] = useState({ status: '', message: '' })
  const [loading, handleLoading] = useState<Boolean>(false)
  
  const registerVendor: SubmitHandler<Vendor> = async(data) => {
   handleLoading(true)
      const vendorService = new VendorService()
      try{
      const response = await vendorService.create(data)
      if (response.success===false) {
        let errorResponse = response.message?response.message:'Error occured, try again'
        handleToast({ status: 'error', message: errorResponse  })
      } else {
        handleToast({ status: 'success', message: 'Vendor '+ data.names+' is registered successfully' })
         reset(response)
         router.push('/vendors')
      }
      handleLoading(false)
      setTimeout(() => {
        handleToast({ status: '', message: '' })
      }, 3000)
   
   
   }catch (error:any) {
     handleToast({ status: 'error', message: error.response.data.message?error.response.data.message: 'Error occured, try again'  })
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
    
        <form onSubmit={handleSubmit(registerVendor)} className="text-sm w-full -mt-2">
        <div className="row mt-7 w-full">
        <label htmlFor="names" className="mb-2 text-sm capitalize block">Names</label>
           <input
            type="text"
            id="names"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('names',
         {
           required:"Please enter full names", 
           minLength: {
               value:5,
               message: "must be atleast 5 characters"
           }
        })}
           />

           <span className="text-red-600 text-xs block mt-2">{errors.names?.message}</span>

         </div>


         <div className=" mt-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
           <div className="form-group">
           <label htmlFor="email" className="mb-2 text-sm capitalize block">Email</label> 
           <input
            type="email"
            id="email"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('contact_email',
         {
           required:"Please enter a valid email", 
         pattern:{value:/\S+@\S+\.\S+/, message:"Please enter a valid email ex: example@mm.com"}
        })}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.contact_email?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="phone" className="mb-2 text-sm capitalize block">Phone contact</label> 
          <input
            type="text"
            id="phone"
            className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
            {...register('contact_phone',
                        {
                           required: "Please enter a phone number",
                           minLength:{value:10,
                              message:'Please enter 10 digits'},
                           maxLength:{value:10,
                                 message:'Please enter 10 digits'}
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
           <label htmlFor="type" className="mb-2 text-sm capitalize block">Vendor type</label> 
           <select  id="type"   className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register('type',
              {
                 required: "Please choose account type"
              })}
           >
              <option value="PERSONAL">PERSONAL</option>
              <option value="COMPANY">COMPANY</option>
           </select>
           <span className="text-red-600 text-xs block mt-2 w-48">{errors.type?.message}</span>
  
           </div>

           </div>
         
           <Button title="Register" loading={loading} loadingTitle="Registering ..." small />
    
           </form >
        </div >
    )
}