import Button from '../../authentication/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Vendor } from '../../../../types/types'
import { useState,useEffect } from 'react'
import { VendorService } from '../../../../pages/api/services/VendorService'
import { Toast } from '../../toasts/Toast'
import { useRouter } from 'next/router'
export function EditVendor(props:any): JSX.Element {
  const { register, handleSubmit, formState: { errors },reset } = useForm<Vendor>()
  const [{ status, message }, handleToast] = useState({ status: '', message: '' })
  const [loading, handleLoading] = useState<Boolean>(false)
  const [vendor, setVendor] = useState<any>({})
  async function getOneVendor(id: String) {
      const service = new VendorService()
      service.getOne(id)
      .then(res=> {
          setVendor(res.data)
          console.log(props.id)
          console.log('res',res.data)
       }).catch(err=> {
           console.log(err)
       })
  }

  useEffect(()=> {
    getOneVendor(props.id)
})
    const router = useRouter()
  
  const updateVendor: SubmitHandler<Vendor> = async(data) => {
   handleLoading(true)
   let newVendor = {
     id: props.id,
     names: data.names || vendor.names,
     contact_email: data.contact_email || vendor.contact_email,
     contact_phone: data.contact_phone || vendor.contact_phone,
     address: data.address || vendor.address,
     type: data.type || vendor.type
   }
     console.log('new',newVendor)
      const vendorService = new VendorService()
      try{
      const response = await vendorService.update(newVendor,props.id)
      if (response.success===false) {
        let errorResponse = response.message?response.message:'Error occured, try again'
        handleToast({ status: 'error', message: errorResponse  })
      } else {
        handleToast({ status: 'success', message: 'Vendor '+ data.names+' is updated successfully' })
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
    
        <form onSubmit={handleSubmit(updateVendor)} className="text-sm w-full -mt-2">
        <div className="row mt-7 w-full">
        <label htmlFor="names" className="mb-2 text-sm capitalize block">Names</label>
           <input
            type="text"
            id="names"
            className= "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
         {...register('names',
        )}
          defaultValue={vendor.names}    
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
         )}
        defaultValue={vendor.contact_email}
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
                       )}
             defaultValue={vendor.contact_phone}
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
           )}
            defaultValue={vendor.address}
           />

        <span className="text-red-600 text-xs block mt-2 w-48">{errors.address?.message}</span>

           </div>

           <div className="form-group">
           <label htmlFor="type" className="mb-2 text-sm capitalize block">Vendor type</label> 
           <select  id="type"   className = "rounded-sm bg-gray-50 ring-1 ring-gray-200 outline-none w-full py-2 px-3"
              {...register('type',
              )}
           >
              <option value={vendor.type}>{vendor.type}</option>
           { vendor.type !== 'PERSONAL' && (<option value="PERSONAL">PERSONAL</option>) }
           { vendor.type !== 'COMPANY' && (<option value="COMPANY">COMPANY</option>)}
           </select>
           <span className="text-red-600 text-xs block mt-2 w-48">{errors.type?.message}</span>
  
           </div>

           </div>
         
           <Button title="Update" loading={loading} loadingTitle="Updating ..." small />
    
           </form >
        </div >
    )
}